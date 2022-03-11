import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PeriodCardConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop( {default: 0})
    offlineTimeLimitMin : number;

    @Prop({default: 0})
    offlineGoldPreMin : number;


    @Prop({default: 0})
    firstBuyGold : number;


    @Prop({default: 0})
    dailyGold : number;

    @Prop(raw([{
        id: {type: Number, default: 0},
        boxName: {type: String, default: ''},
        weight: {type: Number, default: 0},
    }]))
    boxsMonthCard: Record<string, any>;

    @Prop(raw([{type: Number}]))
    dropStages: Record<number,any>;


    @Prop({type: SchemaTypes.Double})
    cRateMonthCard ;


    @Prop({default:''})
    rateMonthCard : string



}

export const PeriodCardConfigSchema = SchemaFactory.createForClass(PeriodCardConfig);

export const PeriodCardConfigModel = {
    name: PeriodCardConfig.name,
    schema: PeriodCardConfigSchema,
    collection: 'periodCardConfig'
};
