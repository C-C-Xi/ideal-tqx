import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import * as rp from "request-promise";
import * as Math from "math";

import * as _ from "underscore";
import { get } from "lodash";
import {Exception} from "../../exception/Exception";
import {ExceptionEnum} from "../../exception/Exception.enum";
import {CodeEnum} from "../../config/enum/code.enum";
import {InjectModel} from "@nestjs/mongoose";
import {IpError} from "../../entity/mongo/account/IPError.schema";
import {Model} from "mongoose";
import fs from "fs";
import path from "path";
import {PlayerDeviceInfo} from "../../entity/mongo/default/PlayerDeviceInfo.schema";
import {ToPlayer} from "../../entity/mongo/default/ToPlayer.schema";

const searcherIp = require('geoip-lite');

@Injectable()
export class CommonService {
    private config: any = {};
    constructor(
        @InjectModel(IpError.name)
        private ipErrorModel: Model<IpError>,
        @InjectModel(PlayerDeviceInfo.name)
        private playerDeviceInfoModel: Model<PlayerDeviceInfo>,
        @InjectModel(ToPlayer.name)
        private toPlayerModel: Model<ToPlayer>,
    ) {
        this.initConfig();
    }
    private initConfig() {
        let files = [];
        try {
            files = fs.readdirSync(path.resolve(__dirname + "/jsonfile"), "utf8");
        } catch (error) {
            Logger.error("gconfigModule readdirSync error1: ", error);
            return;
        }

        let self = this;
        files.forEach(element => {
            let p = path.resolve(__dirname + "/jsonfile/" + element);
            let keyName = element.replace(".json", "");
            let data: any = {}

            try {
                data = self.reload(p);
            } catch (error) {
            }

            if (data.code === 200) {
                self.config[keyName] = data.data;
            }

            fs.watchFile(p, () => {
                let data: any = {}
                try {
                    data = self.reload(p);
                } catch (error) {
                }

                if (data.code === 200) {
                    self.config[keyName] = data.data;
                }
            });
        });
    }

    private reload(p) {
        let json: any = {};
        try {
            json = fs.readFileSync(p, 'utf-8');
            try {
                json = JSON.parse(json)
                return { code: 200, data: json };
            } catch (error) {
                Logger.error("gconfigModule readdirSync error3: ", p);
                return { code: 500 };
            }
        } catch (error) {
            Logger.error("gconfigModule readdirSync error2: ", p);
            return { code: 500 };
        }
    }
    public get(param, value = undefined) {
        const configValue =get(this.config, param);
        if (configValue === undefined) {
            return value;
        }
        return configValue;
    }
    async iperror(body: any): Promise<any> {
        if (body.ip) return;
        let err = "";
        await this.ipErrorModel.insertMany({time: _.now(), body: JSON.stringify(body), err: err});
        throw Exception.toException(ExceptionEnum.LOGIN_ERROR_IP_NOT_FOUND);
    }

    async getIpRegion(ip: string): Promise<any> {
        let region;
        try {
            let res = searcherIp.lookup(ip);
            region = res.country;
        } catch (e) {
            console.log(e);
        }
        if (!region) {
            region = ""; // 默认
        }
        return region
    }

    async searchPlayer(params: any): Promise<any> {
        let where: any = {};

            where[params.searchKey] = Number(params.searchValue);


        let res:any = await this.toPlayerModel.findOne(where, {
            _id: 0, uid: 1, mobile: 1, wxInfo: 1,
            partnerInfo: 1, deviceInfo: 1, accountInfo: 1, playerAircraft: 1, createTime: 1
        }).lean();
        let resData: any = {};
        if (!!res) {
            resData.uid = res.uid;
            resData.mobile = res.mobile;
            resData.nickname = res[params.type]["nickName"];
            resData.faceImgUrl = res[params.type]["faceImgUrl"];
            resData.qid = res.partnerInfo.qid;
            resData.deviceId = res.deviceInfo.deviceId;
            resData.userId = res[params.type]["userId"];
            resData.vip = res.accountInfo.vipLv;
            resData.oriDeviceId = res.deviceInfo.oriDeviceId;
            resData.oriDeviceIdType = res.deviceInfo.oriDeviceIdType;
            resData.amount = res.accountInfo.amount;
            resData.bulletLv = res.playerAircraft.bulletLv;
            resData.appType = !!res.partnerInfo.loginAppType ? res.partnerInfo.loginAppType : 0;
            resData.registerAppType = !!res.partnerInfo.registerAppType ? res.partnerInfo.registerAppType : 0;
            resData.createTime = res.createTime;
            resData.breakThroughLevelId = !!res.playerAircraft.breakThroughLevelId ? res.playerAircraft.breakThroughLevelId : 0;
        }

        return resData ;
    }
    async getENV(key: string): Promise<any> {
        return process.env[key];
    }

    async getDevelopType(): Promise<any> {
        return process.env.DEVELOP_TYPE;
    }
    public async isWhitePlayer(uid): Promise<any> {
        let findPlayerDeviceInfo = await this.playerDeviceInfoModel.findOne({ uid: uid }).lean();
        return !!findPlayerDeviceInfo && findPlayerDeviceInfo.status == 99;
    }
    public async getGameServer(appType,lockPlayer=undefined): Promise<any> {
        let gameServers: any;
        gameServers = this.config.get("config" + appType + ".GAME_SERVER_LOGIN");
        if (!!lockPlayer && !!lockPlayer.white && !!lockPlayer.bate) {
            // bate 内部账号
            gameServers = this.config.get("config" + appType + ".GAME_SERVER_LOGIN_BATE");
        }
        if (!gameServers) {
            throw Exception.toException(ExceptionEnum.LOGIN_ERROR_APPTYPE,"appType错误：" + appType,{indulgeCheck: false})
        }

        let num = Math.floor(Math.random() * (gameServers.length - 1 + 1)) + 0;
        return gameServers[num];
    }

    public async formateTime(date: any = new Date(), fmt = "yyyy-MM-dd h:m:s") {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }

        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    }

    public async today() {
        return Date.parse(await this.formateTime(new Date(), "yyyy.MM.dd")) / 1000
    }

    public async realDay(time) {
        return Date.parse(await this.formateTime(new Date(time), "yyyy.MM.dd")) / 1000
    }

    public async monthStart() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let needTime = "";
        if (m < 10) {
            needTime += y + "-" + "0" + m + "-" + "01" + " 00:00:00"
        } else {
            needTime += y + "-" + m + "-" + "01" + " 00:00:00"
        }

        let ct = await this.realDay(needTime);
        return ct;
    }

    public nonceStr(num: Number) {
        let strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (let i = 0; i < num; i++) {
            let t = Math.floor(Math.random() * strPol.length);
            str += strPol[t];
        }

        return str;
    }
}
