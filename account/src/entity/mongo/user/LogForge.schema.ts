import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogForge extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogForgeSchema = SchemaFactory.createForClass(LogForge);

export const LogForgeModel = {
    name: LogForge.name,
    schema: LogForgeSchema,
    collection: 'LOG_Forge'
};
