import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import {MongooseModule} from "@nestjs/mongoose";

import {CommonService} from "./common.service";
import {NotificationConfigSchemaModel} from "../../entity/mongo/system/NotificationConfig.schema";
import {IpErrorModel} from "../../entity/mongo/account/IPError.schema";
import {PlayerDeviceInfoModel} from "../../entity/mongo/default/PlayerDeviceInfo.schema";
import {ToPlayer, ToPlayerModel} from "../../entity/mongo/default/ToPlayer.schema";

const BackendModel = [
    NotificationConfigSchemaModel,
    PlayerDeviceInfoModel
];
const StatisticsModel = [
    IpErrorModel
];
const TOGameModel = [
    ToPlayerModel
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
