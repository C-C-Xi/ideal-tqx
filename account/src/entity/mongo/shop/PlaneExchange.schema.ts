import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlaneExchange extends Document {
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

    @Prop()
    resetTimes: number;

    @Prop({default:0})
    breakThrough: number;

    @Prop({default:0})
    tomorrowExchange: number;

    @Prop({type: SchemaTypes.Long})
    configTimestamp;
}

export const PlaneExchangeSchema = SchemaFactory.createForClass(PlaneExchange);

export const PlaneExchangeModel = {
    name: PlaneExchange.name,
    schema: PlaneExchangeSchema,
    collection: 'planeExchange'
};
