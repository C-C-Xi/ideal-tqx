import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class TaskSanxiaoRollback extends Document {
    @Prop()
    id: number;

    @Prop(raw([{type: Number}]))
    taskId: Record<string, any>;
}

export const TaskSanxiaoRollbackSchema = SchemaFactory.createForClass(TaskSanxiaoRollback);

export const TaskSanxiaoRollbackModel = {
    name: TaskSanxiaoRollback.name,
    schema: TaskSanxiaoRollbackSchema,
    collection: 'taskSanxiaoRollback'
};
