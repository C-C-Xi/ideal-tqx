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
import {LockIpModel} from "../../entity/mongo/default/LockIp.schema";
import {ComRipsModel} from "../../entity/mongo/user/banned/ComRips.schema";
import {ChannelsModel} from "../../entity/mongo/channel/Channels.schema";
import {ChannelsBindAdvModel} from "../../entity/mongo/channel/ChannelsBindAdv.schema";
import {
    ConfigSlotsRoomRewardRouletteModel
} from "../../entity/mongo/gameUs/config/regulator/ConfigSlotsRoomRewardRoulette.schema";
import {PlayerDeviceInfoModel} from "../../entity/mongo/default/PlayerDeviceInfo.schema";
import {ConfigLobbyVipLabelModel} from "../../entity/mongo/gameUs/config/advanced/ConfigLobbyVipLabel.schema";
import {ConfigLobbyVipModel} from "../../entity/mongo/gameUs/config/advanced/ConfigLobbyVIp.schema";
import {ErrorLog} from "../../entity/mysql/default/ErrorLog.entity";
import {LoginLog} from "../../entity/mysql/default/LoginLog.entity";
const BackendModel = [
   NotificationConfigSchemaModel,
    MaintainConfigModel,
    LockIpModel,
    PlayerDeviceInfoModel
];
const StatisticsModel = [
    IpErrorModel
];
const TOGameModel = [
    ToPlayerModel,
    LockPlayerModel,
    ChannelsModel,
    ChannelsBindAdvModel,
    ConfigSlotsRoomRewardRouletteModel,
    ConfigLobbyVipLabelModel,
    ConfigLobbyVipModel
];
const CommonResourceModel = [
    ComRipsModel
];
@Module({
    imports: [
        TypeOrmModule.forFeature([User, ErrorLog, LoginLog], 'tapout_pro'),
        MongooseModule.forFeature(TOGameModel, 'TOGame'),
        MongooseModule.forFeature(BackendModel, 'Backend'),
        MongooseModule.forFeature(StatisticsModel, 'Statistics'),
        MongooseModule.forFeature(CommonResourceModel, 'CommonResource'),
        CommonModule
    ],
    controllers:[UserController],
    providers: [UserResolver, UserService],
    exports: [UserService,LogService],
})
export class UsersModule { }
