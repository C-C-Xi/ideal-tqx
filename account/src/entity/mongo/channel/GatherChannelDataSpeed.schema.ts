import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GatherChannelDataSpeed extends Document {
    @Prop()
    uid: number;

    @Prop()
    qid: number;

    @Prop()
    num: number;

    @Prop()
    recharge: number;

    @Prop()
    symbolExt1: number;

    @Prop()
    symbolExt2: number;

    @Prop()
    symbolExt3: number;

    @Prop()
    dateTime: number;

    @Prop()
    newUser: number;

    @Prop({type: SchemaTypes.Long})
    createTime;
}

export const GatherChannelDataSpeedSchema = SchemaFactory.createForClass(GatherChannelDataSpeed);

//定义索引
GatherChannelDataSpeedSchema.index({uid: -1}, {background: true, name: 'GatherChannelDataSpeed_uid'});
GatherChannelDataSpeedSchema.index({dateTime: -1}, {background: true, name: 'GatherChannelDataSpeed_dateTime'});

export const GatherChannelDataSpeedModel = {
    name: GatherChannelDataSpeed.name,
    schema: GatherChannelDataSpeedSchema,
    collection: 'CHANNEL_GatherChannelDataSpeed'
};
