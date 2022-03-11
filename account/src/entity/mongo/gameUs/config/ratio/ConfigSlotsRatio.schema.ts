import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

const ModelDataInt32 = {type: Number, default: 0};
const ModelDataInt64 = {type: SchemaTypes.Long, default: 0};
const ModelDataString = {type: String, default: ''};

@Schema()
export class ConfigSlotsRatio extends Document {

    //签到活动Ratio表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        Ratio: ModelDataInt32,
    }]))
    SignRatio: Record<string, any>;

    //任务需求奖励Ratio表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        ChainConditionRatio: ModelDataString,
        ChainTargetsRatio: ModelDataString,
        ChainRewardsRatio: ModelDataString,
        SuperConditionRatio: ModelDataString,
        SuperTargetsRatio: ModelDataString,
        SuperRewardsRatio: ModelDataString,
        PointRewardsRatio: ModelDataString,
        WeekRewardsRatio: ModelDataString,
        MonthRewardsRatio: ModelDataString,
        ChainCount: ModelDataInt32
    }]))
    TaskRatio: Record<string, any>;
}

export const ConfigSlotsRatioSchema = SchemaFactory.createForClass(ConfigSlotsRatio);

export const ConfigSlotsRatioModel = {
    name: ConfigSlotsRatio.name,
    schema: ConfigSlotsRatioSchema,
    collection: 'ConfigSlots_Ratio'
};
