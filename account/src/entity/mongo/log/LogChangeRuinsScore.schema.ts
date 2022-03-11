import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangeRuinsScore extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangeRuinsScoreSchema = SchemaFactory.createForClass(LogChangeRuinsScore);

export const LogChangeRuinsScoreModel = {
    name: LogChangeRuinsScore.name,
    schema: LogChangeRuinsScoreSchema,
    collection: 'LOG_ChangeRuinsScore'
};
