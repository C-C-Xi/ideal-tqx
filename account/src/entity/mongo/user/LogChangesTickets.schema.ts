import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesTickets extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesTicketsSchema = SchemaFactory.createForClass(LogChangesTickets);

export const LogChangesTicketsModel = {
    name: LogChangesTickets.name,
    schema: LogChangesTicketsSchema,
    collection: 'LOG_ChangesTickets'
};
