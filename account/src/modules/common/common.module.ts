import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import {MongooseModule} from "@nestjs/mongoose";

import {CommonService} from "./common.service";
import {NotificationConfigSchemaModel} from "../../entity/mongo/system/NotificationConfig.schema";
import {IpErrorModel} from "../../entity/mongo/account/IPError.schema";
import {PlayerDeviceInfoModel} from "../../entity/mongo/default/PlayerDeviceInfo.schema";

const BackendModel = [
    NotificationConfigSchemaModel,
    PlayerDeviceInfoModel
];
const StatisticsModel = [
    IpErrorModel
];
const TOGameModel = [

];
@Module({
    imports: [
        MongooseModule.forFeature(TOGameModel, 'TOGame'),
        MongooseModule.forFeature(BackendModel, 'Backend'),
        MongooseModule.forFeature(StatisticsModel, 'Statistics'),
        CommonModule
    ],
    providers: [CommonService],
    exports: [
        CommonService
    ],
})
export class CommonModule { }
