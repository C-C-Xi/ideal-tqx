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
@Injectable()
export class LogService {
    constructor(
        @InjectModel(NotificationConfig.name)
        private notificationConfigModel: Model<NotificationConfig>,
        @InjectModel(IpError.name)
        private ipErrorModel: Model<IpError>,
    ) {
    }



    async errorlog(body: any) {

    }

    async loginlog(body: any) {

    }
}
