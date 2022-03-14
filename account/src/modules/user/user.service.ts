import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EntityManager, getManager, Repository} from 'typeorm';

import {User} from './user.entity';
import {CodeEnum} from "../../config/enum/code.enum";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {NotificationConfig} from "../../entity/mongo/system/NotificationConfig.schema";
import {NotificationConfigDto} from "./dtos/notificationConfig.dto";
import {IpError} from "../../entity/mongo/account/IPError.schema";
import * as _ from "underscore";
import {Exception} from "../../exception/Exception";
import {ExceptionEnum} from "../../exception/Exception.enum";
import {LoginDto} from "./dtos/Login.dto";
import {CommonService} from "../common/common.service";
import {OAuth2Service} from "./OAuth2.service";
import {ToPlayer} from "../../entity/mongo/default/ToPlayer.schema";
import {LockPlayer} from "../../entity/mongo/default/LockPlayer.schema";
import {MaintainConfig} from "../../entity/mongo/system/MaintainConfig.schema";
@Injectable()
export class UserService {
    private readonly

    constructor(
        private readonly commonService: CommonService,
        private readonly  oAuth2Service:OAuth2Service,
        @InjectModel(NotificationConfig.name)
        private notificationConfigModel: Model<NotificationConfig>,
        @InjectModel(ToPlayer.name)
        private toPlayerModel: Model<ToPlayer>,
        @InjectModel(LockPlayer.name)
        private lockPlayerModel: Model<LockPlayer>,
        @InjectModel(MaintainConfig.name)
        private maintainModel: Model<MaintainConfig>,

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
        params.region=this.commonService.getIpRegion(params.ip);
        if (!params.loginType){
            throw Exception.toException(ExceptionEnum.SYSTEMS_ERROR_PARAMETER,"params loginType 500")
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
        if (!!params.quid) {quid = params.quid;}
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
        let check: any;
        if (!!user && !!user.uid) {

        }
        return Promise.resolve(undefined);
    }
    async G2A_Unbind(body: any) {

    }

    async G2A_share(query: any) {

    }

    async getVipConfig(body: any) {

    }

    async setAndroidAntiEmuInfo(body: any) {

    }

    private async G2A_OAuth(params: any) {
        return Promise.resolve(undefined);
    }


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
    private async checkWhiteOrLocked(user) {
        let check:any = await this.lockPlayerModel.findOne({uid: user.uid}).lean();
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
        //公告判断
        let maintain = await this.maintainModel.findOne().lean();
        if (!!maintain && maintain.status === 1) {
            if (!!user && !!user.uid) {
                if (!check || !check.white) {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_TEMPORARILY_CLOSED,maintain.content)
                }
            } else {
                throw Exception.toException(ExceptionEnum.LOGIN_ERROR_TEMPORARILY_CLOSED,maintain.content)
            }
        }
    }


}
