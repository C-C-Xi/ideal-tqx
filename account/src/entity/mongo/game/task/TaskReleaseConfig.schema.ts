import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class TaskReleaseConfig extends Document {

    @Prop()
    taskId: number;

    @Prop()
    type1: number;

    @Prop()
    type2: number;

    @Prop()
    TypeName: string;

    @Prop()
    type3: number;

    @Prop()
    isFirst: number;

    @Prop()
    nextId: number;

    @Prop(raw([{
        type: Number
    }]))
    roomType: Record<string, any>;

    @Prop(raw([{
        type: {type: Number, default: 0},
        itemId: {type: Number, default: 0},
        num: {type: Number, default: 0},
    }]))
    rewards: Record<string, any>;

    @Prop(raw([{
        type: {type: Number, default: 0},
        itemId: {type: Number, default: 0},
        num: {type: Number, default: 0},
    }]))
    targets: Record<string, any>;

    @Prop()
    desc: string;

    @Prop()
    order: number;

    @Prop()
    dayNum: number;

    @Prop()
    icon: string;

    @Prop()
    advertising: number;

    @Prop()
    doubleAward: number;

    @Prop()
    extType: number;

    @Prop()
    Skip: number;

    @Prop()
    Data: string;

    @Prop({type: SchemaTypes.Long})
    createTime;
}

export const TaskReleaseConfigSchema = SchemaFactory.createForClass(TaskReleaseConfig);

export const TaskReleaseConfigModel = {
    name: TaskReleaseConfig.name,
    schema: TaskReleaseConfigSchema,
    collection: 'taskReleaseConfig'
};
