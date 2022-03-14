import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './user.entity'
import {UserController} from "./user.controller";
import {LockPlayerModel} from "../../entity/mongo/default/LockPlayer.schema";
import {PlayerCheckIndulgeModel} from "../../entity/mongo/user/PlayerCheckIndulge.schema";
import {MaintainConfigModel} from "../../entity/mongo/system/MaintainConfig.schema";
import {NotificationConfigSchemaModel} from "../../entity/mongo/system/NotificationConfig.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {IpErrorModel} from "../../entity/mongo/account/IPError.schema";
import {CommonModule} from "../common/common.module";
import {LogService} from "./log.service";
import {ToPlayerModel} from "../../entity/mongo/default/ToPlayer.schema";
const BackendModel = [
   NotificationConfigSchemaModel,
    MaintainConfigModel
];
const StatisticsModel = [
    IpErrorModel
];
const TOGameModel = [
    ToPlayerModel,
    LockPlayerModel
];
@Module({
    imports: [
        MongooseModule.forFeature(TOGameModel, 'TOGame'),
        MongooseModule.forFeature(BackendModel, 'Backend'),
        MongooseModule.forFeature(StatisticsModel, 'Statistics'),
        CommonModule
    ],
    controllers:[UserController],
    providers: [UserResolver, UserService],
    exports: [UserService,LogService],
})
export class UsersModule { }
