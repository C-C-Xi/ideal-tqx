import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsShopDayRewards extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;

    @Prop(raw([{
        itemType: {type: Number},
        itemId: {type: Number},
        itemNum: {type: SchemaTypes.Long},
    }]))
    Rewards: Record<string, any>;
}

export const ConfigSlotsShopDayRewardsSchema = SchemaFactory.createForClass(ConfigSlotsShopDayRewards);

export const ConfigSlotsShopDayRewardsModel = {
    name: ConfigSlotsShopDayRewards.name,
    schema: ConfigSlotsShopDayRewardsSchema,
    collection: 'ConfigSlots_ShopDayRewardsConfig'
};
