import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class FruitLabaPoolCtrlConfig extends Document {
    @Prop()
    poolIndex: number;

    @Prop(raw([{
        upperLimit: {type: SchemaTypes.Long},
        rate: {type: Number},
    }]))
    ctrl: Record<string, any>;
}

export const FruitLabaPoolCtrlConfigSchema = SchemaFactory.createForClass(FruitLabaPoolCtrlConfig);

export const FruitLabaPoolCtrlConfigModel = {
    name: FruitLabaPoolCtrlConfig.name,
    schema: FruitLabaPoolCtrlConfigSchema,
    collection: 'fruitLabaPoolCtrlConfig'
};
