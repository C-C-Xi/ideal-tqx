import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsPlayerHead extends Document {
    @Prop({default: 0})
    Id: number;


}

export const ConfigSlotsPlayerHeadSchema = SchemaFactory.createForClass(ConfigSlotsPlayerHead);

export const ConfigSlotsPlayerHeadModel = {
    name: ConfigSlotsPlayerHead.name,
    schema: ConfigSlotsPlayerHeadSchema,
    collection: 'ConfigSlots_PlayerHead'
};
