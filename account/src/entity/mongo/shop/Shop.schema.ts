import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class Shop extends Document {
    @Prop()
    Id: number;
    @Prop()
    NextId: number;
    @Prop()
    ContainId: string;
    @Prop()
    GoodsName: string;
    @Prop()
    GoodsImgUrl: string;
    @Prop()
    Amount: number;
    @Prop()
    GoodsType: number;
    @Prop()
    TabType: number;
    @Prop()
    MarkData: number;
    @Prop()
    OverWeight: number;
    @Prop(raw([{
        Type: {type: Number},
        ItemId: {type: Number},
        Num: {type: Number}
    }]))
    RewardItems: Record<string, any>;
    @Prop(raw([{
        Type: {type: Number},
        ItemId: {type: Number},
        Num: {type: Number}
    }]))
    FreeGift: Record<string, any>;
    @Prop()
    Status: number;
    @Prop()
    Order: number;
    @Prop()
    Vip: number;
    @Prop()
    DailyLimit: number;
    @Prop()
    TotalLimit: number;
    @Prop()
    FirstUI: number;
    @Prop()
    Posterurl: string;
    @Prop({type: SchemaTypes.Long})
    ConfigTimestamp;

}

export const ShopSchema = SchemaFactory.createForClass(Shop);

export const ShopModel = {
    name: Shop.name,
    schema: ShopSchema,
    collection: 'shop'
};
