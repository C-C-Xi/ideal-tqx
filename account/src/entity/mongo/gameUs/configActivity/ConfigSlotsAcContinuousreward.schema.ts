import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsAcContinuousReward extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    ShopId: number;

    @Prop({default: ''})
    Reward: string;
}

export const ConfigSlotsAcContinuousRewardSchema = SchemaFactory.createForClass(ConfigSlotsAcContinuousReward);

export const ConfigSlotsAcContinuousRewardModel = {
    name: ConfigSlotsAcContinuousReward.name,
    schema: ConfigSlotsAcContinuousRewardSchema,
    collection: 'ConfigSlots_AcContinuousReward'
};
