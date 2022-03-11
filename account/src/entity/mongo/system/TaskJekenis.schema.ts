import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class TaskJekenis extends Document {
    @Prop()
    status: number;

    @Prop()
    job_name: string;

    @Prop({type:SchemaTypes.Long})
    insertTime;

    @Prop({type:SchemaTypes.Long})
    updateTime;
}

export const TaskJekenisSchema = SchemaFactory.createForClass(TaskJekenis);

export const TaskJekenisModel = {
    name: TaskJekenis.name,
    schema: TaskJekenisSchema,
    collection: 'task_jekenis'
};
