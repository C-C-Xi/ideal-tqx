import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ToAd extends Document {
    @Prop()
    qid: number;

    @Prop({type: SchemaTypes.Long})
    ctime;
}

export const ToAdSchema = SchemaFactory.createForClass(ToAd);

//定义索引
ToAdSchema.index({ctime: -1}, {background: true, name: 'TO_AD_ctime'});
ToAdSchema.index({deviceIdArr: 1}, {background: true, name: 'TO_AD_deviceIdArr'});
ToAdSchema.index({ctime: -1, deviceIdArr: 1}, {background: true, name: 'TO_AD_ctime_deviceIdArr'});

export const ToAdModel = {
    name: ToAd.name,
    schema: ToAdSchema,
    collection: 'TO_AD'
};
