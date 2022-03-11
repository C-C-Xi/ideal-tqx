import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyShare extends Document {
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

export const ConfigLobbyShareSchema = SchemaFactory.createForClass(ConfigLobbyShare);

export const ConfigLobbyShareModel = {
    name: ConfigLobbyShare.name,
    schema: ConfigLobbyShareSchema,
    collection: 'shareConfig'
};
