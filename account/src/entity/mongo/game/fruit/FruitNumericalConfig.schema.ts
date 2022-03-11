import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class FruitNumericalConfig extends Document {

    @Prop()
    gearsId: number;

    @Prop()
    gameType: number;

    @Prop()
    stageType: number;

    @Prop()
    isPureEarn: boolean;

    @Prop()
    broadcast: number;

    @Prop()
    prizeRate3: number;

    @Prop()
    prizeRate4: number;

    @Prop()
    prizeRate5: number;

    @Prop()
    positionData: object;

    @Prop(raw([{
        step: {type:Number},
        num: {type:Number},
    }]))
    forceProtStep: Record<string, any>;

    @Prop()
    status: number;
}

export const FruitNumericalConfigSchema = SchemaFactory.createForClass(FruitNumericalConfig);

export const FruitNumericalConfigModel = {
    name: FruitNumericalConfig.name,
    schema: FruitNumericalConfigSchema,
    collection: 'fruitNumericalConfig'
};
