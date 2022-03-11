import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PathRecord extends Document {
    @Prop()
    path: string;

    @Prop({type: SchemaTypes.Long})
    num;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const PathRecordSchema = SchemaFactory.createForClass(PathRecord);

export const PathRecordModel = {
    name: PathRecord.name,
    schema: PathRecordSchema,
    collection: 'pathRecord'
};
