import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class NumericalConfig2 extends Document {

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

    @Prop({type: SchemaTypes.Long,default:0})
    goldLimit;

    @Prop()
    prizeRate10: number;

    @Prop()
    prizeRate11: number;

    @Prop()
    prizeRate12: number;

    @Prop()
    prizeRate13: number;

    @Prop()
    prizeRate14: number;

    @Prop()
    prizeRate15: number;

    @Prop()
    positionData: object;

    @Prop(raw([{
        step: {type:Number},
        num: {type:Number},
    }]))
    forceProtStep: Record<string, any>;

    @Prop(raw([{
        multiple: {type:Number},
        rate: {type:Number},
    }]))
    highRate: Record<string, any>;

    @Prop()
    status: number;
}

export const NumericalConfig2Schema = SchemaFactory.createForClass(NumericalConfig2);

export const NumericalConfig2Model = {
    name: NumericalConfig2.name,
    schema: NumericalConfig2Schema,
    collection: 'numericalConfig2'
};
