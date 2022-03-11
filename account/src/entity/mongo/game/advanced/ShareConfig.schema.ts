import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ShareConfig extends Document {
    @Prop()
    Id: number;

    //徒弟贡献抽奖次数
    @Prop()
    discipleDraw: number;

    //徒孙贡献抽奖次数
    @Prop()
    lowDiscipleDraw: number;

    //徒孙贡献上限
    @Prop()
    lowDiscipleRedpackMax: number;

    //徒弟贡献上限
    @Prop()
    discipleRedpackMax: number;

    //徒弟贡献礼券比例
    @Prop()
    discipleRedpackPer: number;

    //徒孙贡献礼券比例
    @Prop()
    lowDiscipleRedpackPer: number;

    //抽奖物品类型
    @Prop()
    drawItemType: number;

    @Prop()
    drawMaxMoney: number;

    @Prop()
    drawMinMoney: number;

    //红包礼券兑换物品类型
    @Prop()
    redpackItemType: number;

    @Prop({type: SchemaTypes.Long})
    redpackItemCanExchange;

    @Prop()
    redpackItemNum: number;

    @Prop()
    discipleAddAmount: number;

    @Prop()
    lowDiscipleAddAmount: number;

    @Prop()
    dailyShareGetAmount: number;

    @Prop()
    totalShareGetAmount: number;
}

export const ShareConfigSchema = SchemaFactory.createForClass(ShareConfig);

export const ShareConfigModel = {
    name: ShareConfig.name,
    schema: ShareConfigSchema,
    collection: 'shareConfig'
};
