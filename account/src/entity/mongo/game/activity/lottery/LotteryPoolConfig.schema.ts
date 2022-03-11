import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖池配置
@Schema()
export class LotteryPoolConfig extends Document {
    @Prop()
    goodsId: number;

    @Prop()
    rate2pool: number;

    @Prop()
    goodsName: string;

    @Prop()
    pool: number;


    @Prop()
    status: number;
}

export const LotteryPoolConfigSchema = SchemaFactory.createForClass(LotteryPoolConfig);

export const LotteryPoolConfigModel = {
    name: LotteryPoolConfig.name,
    schema: LotteryPoolConfigSchema,
    collection: 'lotteryPoolGoodsConfig'
};
