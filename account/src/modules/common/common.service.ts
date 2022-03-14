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

const searcherIp = require('geoip-lite');

@Injectable()
export class CommonService {
    private config: any = {};
    constructor(
        @InjectModel(IpError.name)
        private ipErrorModel: Model<IpError>,
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

    async getENV(key: string): Promise<any> {
        return process.env[key];
    }

    async getDevelopType(): Promise<any> {
        return process.env.DEVELOP_TYPE;
    }

}
