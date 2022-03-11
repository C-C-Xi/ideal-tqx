import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GatherPlayerDataEarnings extends Document {
    @Prop()
    uid: number;

    @Prop()
    AppType: number;

    @Prop()
    qid: number;

    @Prop()
    csPlayType: number;

    //兑换
    @Prop({type: Double, default: 0.00})
    exchangeRedbag;

    //充值
    @Prop({default: 0})
    recharge: number;

    @Prop()
    accountInfo: object;

    @Prop({default: 0})
    restrict: number;

    @Prop({default: 0})
    lockPlayType: number;

    @Prop({type: SchemaTypes.Long})
    lastLoginTime;

    @Prop({type: SchemaTypes.Long})
    registerTime;

    @Prop({type: SchemaTypes.Long})
    gatherBeginTime;
}

export const GatherPlayerDataEarningsSchema = SchemaFactory.createForClass(GatherPlayerDataEarnings);

export const GatherPlayerDataEarningsModel = {
    name: GatherPlayerDataEarnings.name,
    schema: GatherPlayerDataEarningsSchema,
    collection: 'US_GatherPlayerDataEarnings'
};
