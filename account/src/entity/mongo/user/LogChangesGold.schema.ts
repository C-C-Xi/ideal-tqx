import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesGold extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesGoldSchema = SchemaFactory.createForClass(LogChangesGold);

export const LogChangesGoldModel = {
    name: LogChangesGold.name,
    schema: LogChangesGoldSchema,
    collection: 'LOG_ChangesGold'
};
