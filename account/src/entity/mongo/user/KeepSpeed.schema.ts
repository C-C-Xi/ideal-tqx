import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class KeepSpeed extends Document {
    @Prop({default: 0})
    qid: number;

    @Prop({default: 0})
    registerUser: number;

    @Prop({default: 0})
    active: number;

    @Prop()
    data: object;

    @Prop()
    how: object;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const KeepSpeedSchema = SchemaFactory.createForClass(KeepSpeed);

export const KeepSpeedModel = {
    name: KeepSpeed.name,
    schema: KeepSpeedSchema,
    collection: 'keepSpeed'
};
