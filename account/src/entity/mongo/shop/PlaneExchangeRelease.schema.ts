import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlaneExchangeRelease extends Document {
    @Prop()
    Id: number;

    @Prop()
    nextId: number;

    @Prop()
    goodsName: string;

    @Prop()
    belongType: number;

    @Prop()
    goodsImgUrl: string;

    @Prop()
    desc: string;

    @Prop()
    amountType: number;

    @Prop()
    amount: number;

    @Prop()
    tabType: number;

    @Prop(raw([{
        itemType: {type:Number},
        itemId: {type:Number},
        itemNum: {type:Number},
    }]))
    rewardItems: Record<string, any>;

    @Prop()
    status: number;

    @Prop()
    order: number;

    @Prop()
    vip: number;

    @Prop()
    dailyLimit: number;

    @Prop()
    totalLimit: number;

    @Prop()
    firstUI: number;

    @Prop()
    bulletLev: number;

    @Prop()
    leaftDay: number;

    @Prop()
    sort: number;

    @Prop()
    title: string;

    @Prop({default:0})
    TestAB: number;

    @Prop({default:0})
    resetTimes:  number;

    @Prop()
    breakThrough: number;

    @Prop()
    tomorrowExchange: number;

    @Prop({type: SchemaTypes.Long})
    configTimestamp;
}

export const PlaneExchangeReleaseSchema = SchemaFactory.createForClass(PlaneExchangeRelease);

export const PlaneExchangeReleaseModel = {
    name: PlaneExchangeRelease.name,
    schema: PlaneExchangeReleaseSchema,
    collection: 'planeExchangeRelease'
};
