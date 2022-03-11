import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class SuperviseCurrencyStock extends Document {
    @Prop()
    dateTime: number;
}

export const SuperviseCurrencyStockSchema = SchemaFactory.createForClass(SuperviseCurrencyStock);

export const SuperviseCurrencyStockModel = {
    name: SuperviseCurrencyStock.name,
    schema: SuperviseCurrencyStockSchema,
    collection: 'SUPERVISE_CurrencyStock'
};
