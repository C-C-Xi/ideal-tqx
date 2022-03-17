import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityManager, getManager, Repository} from 'typeorm';
import * as rp from "request-promise";
import {User} from './user.entity';
import {CodeEnum} from "../../config/enum/code.enum";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {NotificationConfig} from "../../entity/mongo/system/NotificationConfig.schema";
import {NotificationConfigDto} from "./dtos/notificationConfig.dto";
import * as _ from "underscore";
import {Exception} from "../../exception/Exception";
import {ExceptionEnum} from "../../exception/Exception.enum";
import {LoginDto} from "./dtos/Login.dto";
import {CommonService} from "../common/common.service";
import {OAuth2Service} from "./OAuth2.service";
import {ToPlayer} from "../../entity/mongo/default/ToPlayer.schema";
import {LockPlayer} from "../../entity/mongo/default/LockPlayer.schema";
import {MaintainConfig} from "../../entity/mongo/system/MaintainConfig.schema";
import {LockIp} from "../../entity/mongo/default/LockIp.schema";
import {ComRips} from "../../entity/mongo/user/banned/ComRips.schema";
import {Channels} from "../../entity/mongo/channel/Channels.schema";
import {ChannelsBindAdv} from "../../entity/mongo/channel/ChannelsBindAdv.schema";
import {
    ConfigSlotsRoomRewardRoulette
} from "../../entity/mongo/gameUs/config/regulator/ConfigSlotsRoomRewardRoulette.schema";
import {PlayerDeviceInfo} from "../../entity/mongo/default/PlayerDeviceInfo.schema";
import {ConfigLobbyVipLabel} from "../../entity/mongo/gameUs/config/advanced/ConfigLobbyVipLabel.schema";
import {ConfigLobbyVip} from "../../entity/mongo/gameUs/config/advanced/ConfigLobbyVIp.schema";
const searcherIp = require('geoip-lite');
@Injectable()
export class UserService {
    private readonly

    constructor(
        private readonly commonService: CommonService,
        private readonly oAuth2Service: OAuth2Service,
        @InjectModel(NotificationConfig.name)
        private notificationConfigModel: Model<NotificationConfig>,
        @InjectModel(ToPlayer.name)
        private toPlayerModel: Model<ToPlayer>,
        @InjectModel(LockPlayer.name)
        private lockPlayerModel: Model<LockPlayer>,
        @InjectModel(MaintainConfig.name)
        private maintainModel: Model<MaintainConfig>,
        @InjectModel(LockIp.name)
        private lockIpModel: Model<LockIp>,
        @InjectModel(ComRips.name)
        private comRipsModel: Model<ComRips>,
        @InjectModel(Channels.name)
        private channelsModel: Model<Channels>,
        @InjectModel(ChannelsBindAdv.name)
        private channelsBindAdvModel: Model<ChannelsBindAdv>,
        @InjectModel(ConfigSlotsRoomRewardRoulette.name)
        private configSlotsRoomRewardRouletteModel: Model<ConfigSlotsRoomRewardRoulette>,
        @InjectModel(PlayerDeviceInfo.name)
        private playerDeviceInfoModel: Model<PlayerDeviceInfo>,
        @InjectModel(ConfigLobbyVipLabel.name)
        private configLobbyVipLabelModel: Model<ConfigLobbyVipLabel>,
        @InjectModel(ConfigLobbyVip.name)
        private configLobbyVipModel: Model<ConfigLobbyVip>,
    ) {
    }


    async getNotification(notificationConfigDto: NotificationConfigDto) {
        let thisHour = await this.notificationConfigModel.findOne(
            {type: 'fixed', activityTS: notificationConfigDto.hour},
            {title: 1, message: 1, img: 1}
        ).lean();
        let thisActivity = await this.notificationConfigModel.findOne(
            {type: 'activity'},
            {title: 1, message: 1, img: 1, activityTS: 1}
        ).lean();

        let result = {thisHour: {}, thisActivity: {}};
        if (thisHour) {
            result.thisHour = thisHour;
        }
        if (thisActivity) {
            result.thisActivity = thisActivity;
        }
        return result;
    }

    async G2A_Access_Super(params: any) {
        if (params.bindType != undefined && params.bindType == 1) {
            return await this.G2A_OAuth(params)
        }
        await this.commonService.iperror(params);
        params.ip = params.ip.split(":")[0];
        params.region = this.commonService.getIpRegion(params.ip);
        if (!params.loginType) {
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER, "params loginType 500")
        }
        return await this.loginFaster(params);
    }

    private async loginFaster(params: any) {
        let user: any;
        let authInfo: any = await this.oAuth2Service.getAuthData(params, params.loginType);
        let deviceInfo = this.getDeviceInfo(params);
        let projection: any = {
            _id: 0,
            uid: 1,
            createTime: 1,
            facebookInfo: 1,
            twitterInfo: 1,
            appleInfo: 1,
            "partnerInfo.qid": 1,
            "partnerInfo.qPlayType": 1,
            "deviceInfo.oriDeviceId": 1,
            accountInfo: 1
        };
        let quid: any = 0;
        if (!!params.quid) {
            quid = params.quid;
        }
        let postData: any = {
            loginType: params.loginType ? params.loginType : "guest",
            deviceInfo: deviceInfo,
            partnerInfo: {
                qid: parseInt(params.qid),
                quid: quid,
            },
            countryISO2: params.region,
            registerIp: params.ip,
            lastLoginType: params.loginType ? params.loginType : "guest",
            accToken: "",
            playTypeInfo: {
                channelsBindAdvST: 0,
                channelsBindAdvET: 0,
                channelsBindAdvPlayType: -1,
                qidResPlayType: -1,
                activation: false
            },

        };

        let condition: any = {};
        switch (params.loginType) {
            case "facebook":
                condition["facebookInfo.userId"] = authInfo.userId;
                postData.facebookInfo = authInfo;
                break;
            case "twitter":
                condition["twitterInfo.userId"] = authInfo.userId;
                postData.twitterInfo = authInfo;
                break;
            case "apple":
                condition["appleInfo.userId"] = authInfo.userId;
                postData.appleInfo = authInfo;
                break;
            case "mobile":
                condition.mobile = params.mobile;
                postData.mobile = params.mobile;
                break;
            default:
                condition = deviceInfo
        }
        user = await this.toPlayerModel.findOne(condition, projection).lean();
        //查询用户白名单，和封号状态
        let check = await this.checkWhiteOrLocked(user);
        //检查ip是否被封
        await this.checkIp(params, user);
        //渠道处理
        postData = await this.resolveQid(postData, user);
        let indulgeCheck = false;
        let toAD = {
            canDo: 0 // 默认
        };
        // 直接登录
        let loginData: any;
        try {
            let gameServer: any = this.commonService.getGameServer(params.appType,check);
            loginData = await rp({
                url: gameServer + "/public/userLogin",
                method: "POST",
                json: true,
                body: postData,
            });
            if (_.isString(loginData)) {
                loginData = loginData.trim();
                loginData = JSON.parse(loginData);
            }
        } catch (error) {
            if (_.has(error, "error") && _.has(error.error, "code")) {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP, error.error.code, {indulgeCheck: indulgeCheck})
            }
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP, "http error", {indulgeCheck: indulgeCheck})

        }


        if (!!loginData && loginData.code === 1000) {
            // JWT
            let uid: number;
            let register: boolean;
            let createTime: number;
            if (
                _.has(loginData, "data") &&
                _.has(loginData.data, "playerInfo") &&
                _.has(loginData.data.playerInfo, "uid")
            ) {
                uid = Number(loginData.data.playerInfo.uid);
            }

            if (
                _.has(loginData, "data") &&
                _.has(loginData.data, "playerInfo") &&
                _.has(loginData.data.playerInfo, "register")
            ) {
                register = Boolean(loginData.data.playerInfo.register);
            }

            if (register) {
                await this.playerDeviceInfoModel.insertMany({uid: uid, isRegister: 1, lastLoginTime: _.now()}); // 先加一条记录
            } else {
                let old = await this.playerDeviceInfoModel.findOne({uid: uid}).lean();
                if (!old) {
                    await this.playerDeviceInfoModel.insertMany({uid: uid, isRegister: 0, lastLoginTime: _.now()}); // 先加一条记录
                } else {
                    await this.playerDeviceInfoModel.updateOne({uid: uid}, {lastLoginTime: _.now()});
                }
            }

            if (
                _.has(loginData, "data") &&
                _.has(loginData.data, "playerInfo") &&
                _.has(loginData.data.playerInfo, "createTime")
            ) {
                createTime = Number(loginData.data.playerInfo.createTime);
            }

            if (!!toAD && toAD.canDo == 2) {
                register = true;
            } else if (register && toAD.canDo == 1) {
                register = true;
            } else {
                register = false;
            }

            loginData.data.webToken = "string";
            return {
                data: loginData.data,
                register: register,
                indulgeCheck: indulgeCheck
            };
        }
        loginData.indulgeCheck = indulgeCheck;
        return loginData;
    }

    async G2A_Unbind(params: any) {
        let postData = {
            accToken: params.accToken,
            loginType: "guest",
            deviceInfo: {
                deviceId: "",
                deviceType: "",
                deviceIdType: "",
                lastUpdated: 0,
            },
            partnerInfo: {
                qid: 0
            },
            countryISO2: "",
            registerIp: "",
            lastLoginType: "guest",
            playTypeInfo: {
                channelsBindAdvST: 0,
                channelsBindAdvET: 0,
                channelsBindAdvPlayType: -1,
                qidResPlayType: -1,
                activation: false
            },
        }
        let loginData: any;
        let gameServer = await this.commonService.getGameServer(params.appType);
        try {
            loginData = await rp({
                url: gameServer + "/public/unbind",
                method: "POST",
                json: true,
                body: postData,
            });
            if (_.isString(loginData)) {
                loginData = loginData.trim();
                loginData = JSON.parse(loginData);
            }
        } catch (error) {
            if (_.has(error, "error") && _.has(error.error, "code")) {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP, error.error.code)
            }
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP, "http error")
        }
        if (!!loginData && loginData.code === 1000) return
        return loginData;
    }

    async G2A_share(params: any) {
        let data = {
            quid: params.quid,
            deviceId: '',
            deviceIdType: '',
            deviceType: '',
            devIds: ['', '', '', '', ''],
            loginType: params.loginType,
            token: params.access_token,
            appType: 0,
            qid: 0,
            ip: ''
        }
        return await this.loginFaster(data);
    }

    async getVipConfig(body: any) {
        let VipLabel = await this.configLobbyVipLabelModel.find({}, { _id: 0, __v: 0 }).lean();
        let Vip = await this.configLobbyVipModel.find({}, { _id: 0, __v: 0 }).sort({ VipLevel: 1 }).lean()

        let BasicMaxRatioArr = [];
        let InitialStoRatioArr = [];

        let FinanciaSuperRatioArr = [];
        let FinanciaTurnRatioArr = [];

        let ShopDayRewardsArr = [];

        for (let index = 0; index < Vip.length; index++) {
            let element = Vip[index];
            let BasicMaxRatioEle = element.BasicMaxRatio.split(",");
            switch (BasicMaxRatioEle.length) {
                case 1:
                    BasicMaxRatioArr.push(Number(BasicMaxRatioEle[0]))
                    break;
                case 2:
                    BasicMaxRatioArr.push(Number(BasicMaxRatioEle[1]))
                    break;
                default:
                    return { cdoe: 500, data: { msg: "BasicMaxRatio config error" } }
            }

            let InitialStoRatioEle = element.InitialStoRatio.split(",");
            switch (InitialStoRatioEle.length) {
                case 1:
                    InitialStoRatioArr.push(Number(InitialStoRatioEle[0]))
                    break;
                case 2:
                    InitialStoRatioArr.push(Number(InitialStoRatioEle[1]))
                    break;
                default:
                    return { cdoe: 500, data: { msg: "InitialStoRatio config error" } }
            }

            delete element.BasicMaxRatio;
            delete element.InitialStoRatio;

            /////

            let FinanciaSuperRatioEle = element.FinanciaSuperRatio.split(",");
            switch (FinanciaSuperRatioEle.length) {
                case 1:
                    FinanciaSuperRatioArr.push(Number(FinanciaSuperRatioEle[0]))
                    break;
                case 2:
                    FinanciaSuperRatioArr.push(Number(FinanciaSuperRatioEle[1]))
                    break;
                default:
                    return { cdoe: 500, data: { msg: "BasicMaxRatio config error" } }
            }

            let FinanciaTurnRatioEle = element.FinanciaTurnRatio.split(",");
            switch (FinanciaTurnRatioEle.length) {
                case 1:
                    FinanciaTurnRatioArr.push(Number(FinanciaTurnRatioEle[0]))
                    break;
                case 2:
                    FinanciaTurnRatioArr.push(Number(FinanciaTurnRatioEle[1]))
                    break;
                default:
                    return { cdoe: 500, data: { msg: "InitialStoRatio config error" } }
            }

            delete element.FinanciaSuperRatio;
            delete element.FinanciaTurnRatio;

            // 商城免费奖
            let ShopDayRewardsEle = element.ShopDayRewards.split(",");
            switch (ShopDayRewardsEle.length) {
                case 1:
                    ShopDayRewardsArr.push(Number(ShopDayRewardsEle[0]))
                    break;
                case 2:
                    ShopDayRewardsArr.push(Number(ShopDayRewardsEle[1]))
                    break;
                default:
                    return { cdoe: 500, data: { msg: "InitialStoRatio config error" } }
            }

            delete element.ShopDayRewards;
        }

        for (let index = 0; index < VipLabel.length; index++) {
            let element: any = VipLabel[index];
            switch (element.Id) {
                case 11:
                    element.Ratio = BasicMaxRatioArr;
                    break;
                case 12:
                    element.Ratio = InitialStoRatioArr;
                    break;
                case 13:
                    element.Ratio = FinanciaTurnRatioArr;
                    break;
                case 14:
                    element.Ratio = FinanciaSuperRatioArr;
                    break;
                case 15:
                    element.Ratio = ShopDayRewardsArr;
                    break;
                default:
                    break;
            }
        }

        return {
            VipLabel: VipLabel,
            Vip: Vip
        }
    }

    async setAndroidAntiEmuInfo(body: any) {

    }

    private async G2A_OAuth(params: any) {
        let authInfo: any = await this.oAuth2Service.getAuthData(params, params.loginType);
        if (!!authInfo && authInfo.code) {
            return authInfo;
        }
        let postData: any = {
            loginType: params.loginType,
            partnerInfo: {
                qid: 0
            },
            accToken: params.accToken,
            deviceInfo: {
                deviceId: "",
                deviceType: "",
                deviceIdType: "",
                lastUpdated: 0,
            },
            countryISO2: "",
            registerIp: "",
            lastLoginType: params.loginType,
            playTypeInfo: {
                channelsBindAdvST: 0,
                channelsBindAdvET: 0,
                channelsBindAdvPlayType: -1,
                qidResPlayType: -1,
                activation: false
            },
        };
        switch (params.loginType) {
            case "facebook":
                postData.facebookInfo = authInfo;
                break;
            case "twitter":
                postData.twitterInfo = authInfo;
                break;
            case "apple":
                postData.appleInfo = authInfo;
                break;
            case "mobile":
                postData.mobile = params.mobile;
                break;
        }
        let gameServer = await this.commonService.getGameServer(params.appType);
        let loginData: any;
        try {
            loginData = await rp({
                url: gameServer + "/public/bindUserAccount",
                method: "POST",
                json: true,
                body: postData,
            });
            if (_.isString(loginData)) {
                loginData = loginData.trim();
                loginData = JSON.parse(loginData);
            }
        } catch (error) {
            if (_.has(error, "error") && _.has(error.error, "code")) throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP,error.error.code)
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_HTTP)
        }
        if (!!loginData && loginData.code === 1000) return;
        return loginData;

    }


    /**
     * 获取用户设备信息
     * @param params
     * @private
     */
    private getDeviceInfo(params: any) {
        let addData: any = {};
        try {
            addData.deviceId = params.deviceId.trim().replace(/&quot;/g, "");
            if (_.has(params, "deviceType")) {
                addData.deviceType = params.deviceType.trim().replace(/&quot;/g, "");
            }

            if (_.has(params, "deviceIdType")) {
                addData.deviceIdType = params.deviceIdType
                    .trim()
                    .replace(/&quot;/g, "");
            }
            addData.lastUpdated = Date.parse(new Date().toString());
            return addData;
        } catch (error) {
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_DEVICEINFO);
        }
    }

    /**
     * 判断用户是否类型，白名单或黑名单
     * @param user
     * @private
     */
    private async checkWhiteOrLocked(user) {
        let check: any;
        if (!!user && !!user.uid) {
            check = await this.lockPlayerModel.findOne({uid: user.uid}).lean();
            if (!!check && check.lock) {
                console.error("================================封号: " + user.uid);
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_LOCKED);
            }
            if (!!check && check.kickOut) {
                let time = (_.now()) - check.time;
                if (time <= 180000) {
                    throw Exception.toException(ExceptionEnum.LOGIN_ERROR_KICKOUT);
                }
            }
            if (check || check.white) return;
            let maintain = await this.maintainModel.findOne().lean();
            if (!!maintain && maintain.status === 1) {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_TEMPORARILY_CLOSED, maintain.content)
            }
        }
        return check;
    }

    /**
     * 检查ip
     * @param params
     * @param user
     * @private
     */
    private async checkIp(params, user) {
        let ipReal: any = null
        try {
            ipReal = params.ip.split(":");
            ipReal = ipReal[0];
        } catch (error) {
        }
        if (!!await this.lockIpModel.findOne({ip: ipReal}).lean()) {
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_IP_LOCKED, "无法连接服务器");
        }
        if (!!user && !!await this.comRipsModel.findOne({ip: ipReal, status: 1}).lean()) {
            if (!await this.commonService.isWhitePlayer(user.uid)) {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_IP_LOCKED, "请联系客服1");
            }
        }
    }

    /**
     * 渠道处理
     * @param postData
     * @param user
     * @private
     */
    private async resolveQid(postData, user) {
        let indulgeCheck = false;
        //渠道处理
        if (!!user) {
            postData.partnerInfo.qid = user.partnerInfo.qid;
            postData.playTypeInfo.qidResPlayType = user.partnerInfo.qPlayType;
        }

        let qidRes = await this.channelsModel.findOne({id: Number(postData.partnerInfo.qid)}).lean();
        let toAD = {
            canDo: 0 // 默认
        };
        if (Number(postData.partnerInfo.qid) != 0) {
            let channelsBindAdv: any
            channelsBindAdv = await this.channelsBindAdvModel.findOne({qid: Number(postData.partnerInfo.qid)}).sort({num: -1}).lean();
            if (!!channelsBindAdv) {
                postData.playTypeInfo.channelsBindAdvST = channelsBindAdv.startTime;
                postData.playTypeInfo.channelsBindAdvET = channelsBindAdv.endTime;
                postData.playTypeInfo.channelsBindAdvPlayType = channelsBindAdv.playType;
            }

            if (!!user && !!user.uid) {
                if (!!qidRes) {
                    if (postData.playTypeInfo.qidResPlayType == -1) {
                        postData.playTypeInfo.qidResPlayType = qidRes.playType;
                    }
                } else {
                    let roomRewardRoulette: any = await this.configSlotsRoomRewardRouletteModel.findOne({Initial: 1}).lean();
                    console.log("roomRewardRoulette==========================", roomRewardRoulette);
                    if (roomRewardRoulette) {
                        postData.playTypeInfo.qidResPlayType = roomRewardRoulette.Id;
                    } else {
                        postData.playTypeInfo.qidResPlayType = -1;
                    }

                }
            }

        }
        return postData;
    }


}
