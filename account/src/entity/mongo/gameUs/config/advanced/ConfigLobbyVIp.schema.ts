import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyVip extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    VipLevel: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    VipAccExp;

    @Prop({default: ""})
    BasicMaxRatio: string;

    @Prop({default: ""})
    InitialStoRatio: string;

    @Prop({default: ""})
    FinanciaTurnRatio: string;

    @Prop({default: ""})
    FinanciaSuperRatio: string;

    @Prop({default: ""})
    ShopDayRewards: string;
}

export const ConfigLobbyVipSchema = SchemaFactory.createForClass(ConfigLobbyVip);

export const ConfigLobbyVipModel = {
    name: ConfigLobbyVip.name,
    schema: ConfigLobbyVipSchema,
    collection: 'ConfigLobby_Vip'
};
