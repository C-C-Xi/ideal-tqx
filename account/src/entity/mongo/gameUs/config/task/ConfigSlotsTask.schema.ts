import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsTask extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Module: number;

    @Prop({default: ''})
    TaskName: string;

    @Prop({default: 0})
    Order: number;

    @Prop({default: 0})
    IsFirst: number;

    @Prop({default: 0})
    NextId: number;

    @Prop({default: ''})
    Condition: string;

    @Prop({default: 0})
    Targets: string;

    @Prop({default: 0})
    Rewards: string;
}

export const ConfigSlotsTaskSchema = SchemaFactory.createForClass(ConfigSlotsTask);

export const ConfigSlotsTaskModel = {
    name: ConfigSlotsTask.name,
    schema: ConfigSlotsTaskSchema,
    collection: 'ConfigSlots_TaskConfig'
};
