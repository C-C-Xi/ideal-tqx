import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsFinancialReward extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;


    @Prop({type: SchemaTypes.Long, default: 0})
    KaiYunGold;

    @Prop({type: SchemaTypes.Long, default: 0})
    HongYunGold;

    @Prop({type: SchemaTypes.Long, default: 0})
    TurnGold;

    @Prop({default: ""})
    TurnGoldTimes:string;

    @Prop({default: 0})
    TurnGoldMaxTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    SuperShowMaxGolId;

    @Prop({type: SchemaTypes.Long, default: 0})
    SuperTurnGolId;
}

export const ConfigSlotsFinancialRewardSchema = SchemaFactory.createForClass(ConfigSlotsFinancialReward);

export const ConfigSlotsFinancialRewardModel = {
    name: ConfigSlotsFinancialReward.name,
    schema: ConfigSlotsFinancialRewardSchema,
    collection: 'ConfigSlots_FinancialReward'
};
