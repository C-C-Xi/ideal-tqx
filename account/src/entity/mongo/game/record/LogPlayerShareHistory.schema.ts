import { Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerShareHistory extends Document {

}

export const LogPlayerShareHistorySchema = SchemaFactory.createForClass(LogPlayerShareHistory);

export const LogPlayerShareHistoryModel = {
    name: LogPlayerShareHistory.name,
    schema: LogPlayerShareHistorySchema,
    collection: 'LOG_PlayerShareHistory'
};
