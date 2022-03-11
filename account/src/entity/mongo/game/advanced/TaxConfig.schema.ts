import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class TaxConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    gameType: number;

    @Prop()
    stageType: number;

    @Prop({default: 0})
    winSysTax: number;

    @Prop({default: 0})
    winRankTax: number;

    @Prop({default: 0})
    winPoolTax: number;

    @Prop({default: 0})
    betSysTax: number;

    @Prop({default: 0})
    betRankTax: number;

    @Prop({default: 0})
    betPoolTax: number;

    @Prop({default: 0})
    highTax: number;
}

export const TaxConfigSchema = SchemaFactory.createForClass(TaxConfig);

export const TaxConfigModel = {
    name: TaxConfig.name,
    schema: TaxConfigSchema,
    collection: 'taxConfig'
};
