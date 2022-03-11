import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsTaskMainLine extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    MapId: number;

    @Prop({default: 0})
    PlayId: number;

    @Prop({default: 0})
    NextId: number;

    @Prop({default: 0})
    IfGlobeActivity: number;
}

export const ConfigSlotsTaskMainLineSchema = SchemaFactory.createForClass(ConfigSlotsTaskMainLine);

export const ConfigSlotsTaskMainLineModel = {
    name: ConfigSlotsTaskMainLine.name,
    schema: ConfigSlotsTaskMainLineSchema,
    collection: 'ConfigSlots_TaskMainLineConfig'
};
