import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsFinancialTimes extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;

    @Prop({default: 0})
    OneTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    OneTimesExp;

    @Prop({default: 0})
    TwoTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    TwoTimesExp;

    @Prop({default: 0})
    ThreeTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    ThreeTimesExp;

    @Prop({default: 0})
    FourTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    FourTimesExp;

    @Prop({default: 0})
    FiveTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    FiveTimesExp;

    @Prop({default: 0})
    SixTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    SixTimesExp;


    @Prop({default: 0})
    ExpRate: number;

}

export const ConfigSlotsFinancialTimesSchema = SchemaFactory.createForClass(ConfigSlotsFinancialTimes);

export const ConfigSlotsFinancialTimesModel = {
    name: ConfigSlotsFinancialTimes.name,
    schema: ConfigSlotsFinancialTimesSchema,
    collection: 'ConfigSlots_FinancialTimes'
};
