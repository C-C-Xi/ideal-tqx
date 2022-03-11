import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import {MongooseModule} from "@nestjs/mongoose";
import {LabelConfigModel} from "../../entity/mongo/shop/LabelConfig.schema";
import {ToPlayerModel} from "../../entity/mongo/default/ToPlayer.schema";
import {LabelReleaseConfigModel} from "../../entity/mongo/shop/LabelReleaseConfig.schema";
import {ShopReleaseModel} from "../../entity/mongo/shop/ShopRelease.schema";
import {PlaneShopReleaseModel} from "../../entity/mongo/shop/PlaneShopRelease.schema";
import {Shop} from "../../entity/mysql/shop/shop.entity";
import {ShopExchange} from "../../entity/mysql/shop/shopExchange.entity";
import {ShopLink} from "../../entity/mysql/shop/shopLink.entity";
import {MailExchange} from "../../entity/mysql/default/MailExchange.entity";
import {
    ConfigLobbyGlobalActivityModel
} from "../../entity/mongo/gameUs/configActivity/ConfigLobbyGlobalActivity.schema";
import {
    ConfigSlotsAcContinuousRewardModel
} from "../../entity/mongo/gameUs/configActivity/ConfigSlotsAcContinuousreward.schema";
import {AcContinuousReward} from "../../entity/mysql/TapOut/acContinuousReward.entity";
import {LockPlayerModel} from "../../entity/mongo/default/LockPlayer.schema";
import {PlayerCheckIndulgeModel} from "../../entity/mongo/user/PlayerCheckIndulge.schema";
import {MaintainConfigModel} from "../../entity/mongo/system/MaintainConfig.schema";
import {ChannelsModel} from "../../entity/mongo/channel/Channels.schema";

const TOGameModel = [
    LabelConfigModel,
    ToPlayerModel,
    LabelReleaseConfigModel,
    PlaneShopReleaseModel,
    ConfigLobbyGlobalActivityModel,
ConfigSlotsAcContinuousRewardModel,
    ChannelsModel

];
const BackendModel = [
    LockPlayerModel,
    PlayerCheckIndulgeModel,
    MaintainConfigModel
];

@Module({

    imports: [ TypeOrmModule.forFeature([Shop,ShopExchange,ShopLink,MailExchange,AcContinuousReward], 'tapout_pro'),
        MongooseModule.forFeature(TOGameModel, 'TOGame'),
        MongooseModule.forFeature(BackendModel, 'Backend'),
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [
        ShopService
    ],
})
export class ShopModule { }
