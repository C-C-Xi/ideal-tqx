import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogAdvertRecord extends Document {
    @Prop({type: SchemaTypes.Long})
    ctime;
}

export const LogAdvertRecordSchema = SchemaFactory.createForClass(LogAdvertRecord);

export const LogAdvertRecordModel = {
    name: LogAdvertRecord.name,
    schema: LogAdvertRecordSchema,
    collection: 'advertRecord'
};
