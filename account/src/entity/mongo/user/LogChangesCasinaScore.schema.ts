import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesCasinaScore extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesCasinaScoreSchema = SchemaFactory.createForClass(LogChangesCasinaScore);

export const LogChangesCasinaScoreModel = {
    name: LogChangesCasinaScore.name,
    schema: LogChangesCasinaScoreSchema,
    collection: 'LOG_ChangesCasinaScore'
};
