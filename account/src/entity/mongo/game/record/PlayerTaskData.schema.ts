import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlayerTaskData extends Document {
    @Prop()
    TaskId: number;

    @Prop()
    counts: number;

    @Prop()
    reward: object;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const PlayerTaskDataSchema = SchemaFactory.createForClass(PlayerTaskData);

export const PlayerTaskDataModel = {
    name: PlayerTaskData.name,
    schema: PlayerTaskDataSchema,
    collection: 'RECORD_PlayerTaskData'
};
