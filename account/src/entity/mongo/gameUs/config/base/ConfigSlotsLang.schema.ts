import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsLang extends Document {
    @Prop({default: 0})
    TmplId: number;

    @Prop({default: ""})
    Eng: string;

    @Prop({default: ""})
    Chn: string;

}

export const ConfigSlotsLangSchema = SchemaFactory.createForClass(ConfigSlotsLang);

export const ConfigSlotsLangModel = {
    name: ConfigSlotsLang.name,
    schema: ConfigSlotsLangSchema,
    collection: 'ConfigSlots_LangConfig'
};
