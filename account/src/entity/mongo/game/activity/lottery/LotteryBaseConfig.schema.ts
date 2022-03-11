import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖盘配置
@Schema()
export class LotteryBaseConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    dailyfreeTimes: number;

    @Prop()
    title: string;

    @Prop()
    vipLimit: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    costItems: Record<string, any>;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    costItemsX10: Record<string, any>;

    @Prop(raw([{type: Number}]))
    includedItem: Record<string, any>;

}

export const LotteryBaseConfigSchema = SchemaFactory.createForClass(LotteryBaseConfig);

export const LotteryBaseConfigModel = {
    name: LotteryBaseConfig.name,
    schema: LotteryBaseConfigSchema,
    collection: 'lotteryBaseConfig'
};
