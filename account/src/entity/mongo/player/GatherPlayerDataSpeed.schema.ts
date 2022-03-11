import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GatherPlayerDataSpeed extends Document {
    @Prop()
    uid: number;

    @Prop()
    AppType: number;

    @Prop()
    qid: number;

    @Prop({default: 0})
    totalRecharge: number;

    @Prop({type: Double, default: 0.00})
    totalEarnings;

    @Prop({default: 0})
    totalGetRedpack: number;

    @Prop({default: 0})
    totalGetCasinaScore: number;

    @Prop({type: Double, default: 0})
    exchangeRedbag;

    //金币变动总计
    @Prop({default: 0})
    totalGetGold: number;

    //累计赢取 总计 试炼场 竞宝场
    @Prop({default: 0})
    totalWinGold: number;

    //净输赢 总计 试炼场 竞宝场
    @Prop({default: 0})
    realWinGold: number;

    @Prop({default: -1})
    StageType: number;

    @Prop()
    accountInfo: object;

    @Prop()
    partnerInfo: object;

    @Prop()
    deviceInfo: object;

    @Prop({type: SchemaTypes.Long})
    lastLoginTime;

    @Prop({type: SchemaTypes.Long})
    createTime;

    @Prop()
    dateTime: number;

    @Prop({type: SchemaTypes.Long})
    gatherBeginTime;
}

export const GatherPlayerDataSpeedSchema = SchemaFactory.createForClass(GatherPlayerDataSpeed);

export const GatherPlayerDataSpeedModel = {
    name: GatherPlayerDataSpeed.name,
    schema: GatherPlayerDataSpeedSchema,
    collection: 'US_GatherPlayerDataSpeed'
};
