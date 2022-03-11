import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import {defaults} from "ts-jest/presets";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GatherRechargeExchangeData extends Document {
    @Prop()
    uid: number;

    @Prop()
    AppType: number;

    @Prop()
    qid: number;

    //兑换
    @Prop({type: Double, default: 0.00})
    exchangeRedbag;

    //充值
    @Prop({default: 0})
    recharge: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const GatherRechargeExchangeDataSchema = SchemaFactory.createForClass(GatherRechargeExchangeData);

export const GatherRechargeExchangeDataModel = {
    name: GatherRechargeExchangeData.name,
    schema: GatherRechargeExchangeDataSchema,
    collection: 'US_GatherRechargeExchangeData'
};
