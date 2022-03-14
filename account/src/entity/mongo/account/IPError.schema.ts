import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class IpError extends Document {
    @Prop()
    err: string;

    @Prop()
    body: string;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const IpErrorSchema = SchemaFactory.createForClass(IpError);

export const IpErrorModel = {
    name: IpError.name,
    schema: IpErrorSchema,
    collection: 'iperror'
};
