import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesRedpack extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesRedpackSchema = SchemaFactory.createForClass(LogChangesRedpack);

export const LogChangesRedpackModel = {
    name: LogChangesRedpack.name,
    schema: LogChangesRedpackSchema,
    collection: 'LOG_ChangesRedpack'
};