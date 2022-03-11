import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ToDevIds extends Document {
    @Prop()
    uid: number;

    @Prop()
    qid: number;

    @Prop({type: SchemaTypes.Long})
    ctime;
}

export const ToDevIdsSchema = SchemaFactory.createForClass(ToDevIds);

//定义索引
ToDevIdsSchema.index({ctime: -1}, {background: true, name: 'TO_DevIds_ctime'});
ToDevIdsSchema.index({updateTime: -1}, {background: true, name: 'TO_DevIds_updateTime'});
ToDevIdsSchema.index({uid: 1}, {background: true, name: 'TO_DevIds_uid'});

export const ToDevIdsModel = {
    name: ToDevIds.name,
    schema: ToDevIdsSchema,
    collection: 'TO_DevIds'
};
