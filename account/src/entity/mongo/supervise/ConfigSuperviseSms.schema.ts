import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSuperviseSms extends Document {
    @Prop({default: 0})
    goldMax: number;

    @Prop({default: 0})
    redpackMax: number;

    @Prop({default: 0})
    diamondMax: number;

    @Prop({default: 0})
    ticketsMax: number;

    @Prop({default: 0})
    userMax: number;

    @Prop({default: 0})
    goldBase: number;

    @Prop({default: 0})
    redpackBase: number;

    @Prop({default: 0})
    diamondBase: number;

    @Prop({default: 0})
    ticketsBase: number;

    @Prop({default: 0})
    userBase: number;

    @Prop({default: 0})
    noteTime: number;

    @Prop({default: 0})
    noteTimeLast: number;

    @Prop({type: Array, default: []})
    noteHistory;

    @Prop()
    switch: boolean;

    @Prop({type: Array, default: []})
    mobiles;

    @Prop()
    type: string;

    @Prop({default: 0})
    status: number;

    @Prop({type: SchemaTypes.Long})
    updateTime;
}

export const ConfigSuperviseSmsSchema = SchemaFactory.createForClass(ConfigSuperviseSms);

export const ConfigSuperviseSmsModel = {
    name: ConfigSuperviseSms.name,
    schema: ConfigSuperviseSmsSchema,
    collection: 'Config_SuperviseSms'
};
