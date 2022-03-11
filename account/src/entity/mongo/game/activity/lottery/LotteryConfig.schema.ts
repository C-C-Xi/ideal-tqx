import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//抽奖配置
@Schema()
export class LotteryConfig extends Document {
    @Prop()
    baseId: number;

    @Prop(raw([{
        id: {type: Number},
        weight: {type: Number},
    }]))
    bonusConfigs: Record<string, any>;

    @Prop(raw([{type: Number}]))
    rankRates: Record<string, any>;
}

export const LotteryConfigSchema = SchemaFactory.createForClass(LotteryConfig);

export const LotteryConfigModel = {
    name: LotteryConfig.name,
    schema: LotteryConfigSchema,
    collection: 'lotteryConfig'
};
