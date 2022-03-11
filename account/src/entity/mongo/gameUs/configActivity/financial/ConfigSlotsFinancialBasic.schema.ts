import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsFinancialBasic extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ""})
    Name: string;



    @Prop({default: ""})
    Key: string;

    @Prop({default: ""})
    Data: string;
}

export const ConfigSlotsFinancialBasicSchema = SchemaFactory.createForClass(ConfigSlotsFinancialBasic);

export const ConfigSlotsFinancialBasicModel = {
    name: ConfigSlotsFinancialBasic.name,
    schema: ConfigSlotsFinancialBasicSchema,
    collection: 'ConfigSlots_FinancialBasic'
};
