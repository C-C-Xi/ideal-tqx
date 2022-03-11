import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsFinanciaSuper extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;


    @Prop({default: ''})
    Mini: string;

    @Prop({default: ''})
    MiniWin: string;

    @Prop({default: ''})
    Minor: string;

    @Prop({default: ''})
    MinorWin: string;

    @Prop({default: ''})
    Major: string;

    @Prop({default: ''})
    MajorWin: string;

    @Prop({default: ''})
    Maxi: string;

    @Prop({default: ''})
    MaxiWin: string;


    @Prop({default: ''})
    GrandWin: string;

    @Prop({default: ''})
    Empty: string;
}

export const ConfigSlotsFinanciaSuperSchema = SchemaFactory.createForClass(ConfigSlotsFinanciaSuper);

export const ConfigSlotsFinanciaSuperModel = {
    name: ConfigSlotsFinanciaSuper.name,
    schema: ConfigSlotsFinanciaSuperSchema,
    collection: 'ConfigSlots_FinanciaSuper'
};
