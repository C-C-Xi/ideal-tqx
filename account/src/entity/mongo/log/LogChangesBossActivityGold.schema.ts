import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesBossActivityGold extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesBossActivityGoldSchema = SchemaFactory.createForClass(LogChangesBossActivityGold);

export const LogChangesBossActivityGoldModel = {
    name: LogChangesBossActivityGold.name,
    schema: LogChangesBossActivityGoldSchema,
    collection: 'LOG_ChangesBossActivityGold'
};
