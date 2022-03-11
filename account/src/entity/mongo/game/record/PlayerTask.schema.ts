import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlayerTask extends Document {
    @Prop()
    totalTask: object;

    @Prop()
    countUser: number;

    @Prop({type: SchemaTypes.Long})
    createTime;
}

export const PlayerTaskSchema = SchemaFactory.createForClass(PlayerTask);

export const PlayerTaskModel = {
    name: PlayerTask.name,
    schema: PlayerTaskSchema,
    collection: 'RECORD_PlayerTask'
};
