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
import {ErrorLog} from "../../entity/mysql/default/ErrorLog.entity";
import {LoginLog} from "../../entity/mysql/default/LoginLog.entity";
@Injectable()
export class LogService {
    constructor(
        @InjectRepository(ErrorLog, "default")
        private readonly errorLogRepository: Repository<ErrorLog>,
        @InjectRepository(LoginLog, "default")
        private readonly loginlogRepository: Repository<LoginLog>,
    ) {
    }



    async errorlog(body: any) {
        let time = parseInt(String(_.now() / 1000));
        body.ctime = time;
        try {
            await this.errorLogRepository.insert(body);
        } catch (error) {

        }
        return
    }

    async loginlog(body: any) {
        let time = parseInt(String(_.now() / 1000));
        body.ctime = time;
        try {
            await this.loginlogRepository.insert(body);
        } catch (error) {
        }
    }
}
