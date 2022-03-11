import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class PlaneShopRelease extends Document {
    @Prop()
    id: number;

    @Prop()
    nextId: number;

    @Prop()
    containId: object;

    @Prop()
    googleProductId: string;

    @Prop()
    goodsName: string;

    @Prop()
    goodsImgUrl: string;

    @Prop()
    amount: number;

    @Prop()
    goodsType: number;

    @Prop()
    tabType: number;

    @Prop()
    markData: number;

    @Prop()
    overWeight: number;

    @Prop(raw([{
        itemType: {type: Number},
        itemId: {type: Number},
        itemNum: {type: SchemaTypes.Long},
    }]))
    rewardItems: Record<string, any>;

    @Prop(raw([{
        itemType: {type: Number},
        itemId: {type: Number},
        itemNum: {type: SchemaTypes.Long},
    }]))
    freeGift: Record<string, any>;

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

    @Prop({default: ''})
    posterUrl: string;
}

export const PlaneShopReleaseSchema = SchemaFactory.createForClass(PlaneShopRelease);

export const PlaneShopReleaseModel = {
    name: PlaneShopRelease.name,
    schema: PlaneShopReleaseSchema,
    collection: 'planeShopRelease'
};
