import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsTaskTimes extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Module: number;

    @Prop({default: 0})
    Value: number;
}

export const ConfigSlotsTaskTimesSchema = SchemaFactory.createForClass(ConfigSlotsTaskTimes);

export const ConfigSlotsTaskTimesModel = {
    name: ConfigSlotsTaskTimes.name,
    schema: ConfigSlotsTaskTimesSchema,
    collection: 'ConfigSlots_TaskTimes'
};
