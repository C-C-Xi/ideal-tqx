import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigCountryCode extends Document {
    @Prop()
    Id: number;

    @Prop({default: ""})
    ChineseName: string;

    @Prop({default: ""})
    EnglishName: string;

    @Prop({default:""})
    ISO2: string;

    @Prop({default: ""})
    ISO3: string;

    @Prop()
    CountryCode: number;

    @Prop()
    AreaCode: number;
}

export const ConfigCountryCodeSchema = SchemaFactory.createForClass(ConfigCountryCode);

export const ConfigCountryCodeModel = {
    name: ConfigCountryCode.name,
    schema: ConfigCountryCodeSchema,
    collection: 'Config_CountryCode'
};
