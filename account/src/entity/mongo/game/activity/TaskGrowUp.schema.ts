import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class TaskGrowUp extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    dayNum: number;

    @Prop()
    order: number;

    @Prop()
    taskId: object;
}

export const TaskGrowUpSchema = SchemaFactory.createForClass(TaskGrowUp);

export const TaskGrowUpModel = {
    name: TaskGrowUp.name,
    schema: TaskGrowUpSchema,
    collection: 'taskGrowUp'
};
