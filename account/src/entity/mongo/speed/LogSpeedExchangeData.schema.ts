import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSpeedExchangeData extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    AppType: number;

    @Prop()
    Qid: number;

    @Prop()
    goodsId: number;

    @Prop()
    costRedpack: number;

    @Prop()
    getMoney: number;

    @Prop()
    excCount: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const LogSpeedExchangeDataSchema = SchemaFactory.createForClass(LogSpeedExchangeData);

export const LogSpeedExchangeDataModel = {
    name: LogSpeedExchangeData.name,
    schema: LogSpeedExchangeDataSchema,
    collection: 'SD_LogSpeedExchangeData'
};
