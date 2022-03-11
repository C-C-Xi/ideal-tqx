import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSpeedRechargeData extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    AppType: number;

    @Prop()
    Qid: number;

    @Prop()
    goodsId: number;

    @Prop()
    buyMoney: number;

    @Prop()
    buyCount: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const LogSpeedRechargeDataSchema = SchemaFactory.createForClass(LogSpeedRechargeData);

export const LogSpeedRechargeDataModel = {
    name: LogSpeedRechargeData.name,
    schema: LogSpeedRechargeDataSchema,
    collection: 'SD_LogSpeedRechargeData'
};
