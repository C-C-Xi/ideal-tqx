import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;
@Schema()
export class PlaneGoodLuckTreasureConfig extends Document {
    @Prop()
    id: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    win: Record<string, any>;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    failed: Record<string, any>;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    cost: Record<string, any>;


    @Prop()
    type: number;


    @Prop()
    num: number;


    @Prop()
    personTime: number;




    @Prop()
    loopTime: number;


    @Prop({type: SchemaTypes.Long})
    openTime;




    @Prop()
    systemWin: number;


}

export const PlaneGoodLuckTreasureConfigSchema = SchemaFactory.createForClass(PlaneGoodLuckTreasureConfig);

export const PlaneGoodLuckTreasureConfigModel = {
    name: PlaneGoodLuckTreasureConfig.name,
    schema: PlaneGoodLuckTreasureConfigSchema,
    collection: 'planeGoodLuckTreasureConfig'
};
