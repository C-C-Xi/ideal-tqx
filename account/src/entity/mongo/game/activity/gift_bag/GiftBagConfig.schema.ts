import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class GiftBagConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    cost: number;

    @Prop()
    position: number;

    @Prop()
    multiple: number;


    @Prop()
    jackpotProportion: number;

    @Prop()
    goodsId: number;

    @Prop()
    name: string;

    @Prop()
    goodsName: string;

    @Prop({type: SchemaTypes.Long})
    jackpotCoin;


    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    reward: Record<string, any>;}

export const GiftBagConfigSchema = SchemaFactory.createForClass(GiftBagConfig);

export const GiftBagConfigModel = {
    name: GiftBagConfig.name,
    schema: GiftBagConfigSchema,
    collection: 'planeGiftBagConfig'
};
