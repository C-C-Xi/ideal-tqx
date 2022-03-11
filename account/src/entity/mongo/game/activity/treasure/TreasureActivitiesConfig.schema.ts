import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;
@Schema()
export class TreasureActivitiesConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop()
    goodsId: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    reward: Record<string, any>;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    jackpot: Record<string, any>;

    @Prop()
    time: number;

    @Prop({type: SchemaTypes.Long})
    initNum: number;

    @Prop()
    drawNum: number;

    @Prop()
    rankGold: number;
}

export const TreasureActivitiesConfigSchema = SchemaFactory.createForClass(TreasureActivitiesConfig);

export const TreasureActivitiesConfigModel = {
    name: TreasureActivitiesConfig.name,
    schema: TreasureActivitiesConfigSchema,
    collection: 'treasureActivitiesConfig'
};
