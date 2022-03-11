import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogTask extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    TaskId: number;

    @Prop()
    RewardItems:object;

    @Prop({type:SchemaTypes.Long})
    Time;
}

export const LogTaskSchema = SchemaFactory.createForClass(LogTask);

export const LogTaskModel = {
    name: LogTask.name,
    schema: LogTaskSchema,
    collection: 'LOG_Task'
};
