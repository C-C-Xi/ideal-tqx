import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖品配置
@Schema()
export class PlaneRuinsRewardConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    group: number;

    @Prop(raw([{
        itemType: {type: Number},
        itemId: {type: Number},
        itemNum: {type: Number},
    }]))
    reward: Record<string, any>;

    @Prop()
    weight: number;

    @Prop()
    double: number;

    @Prop()
    colour: number;
}

export const PlaneRuinsRewardConfigSchema = SchemaFactory.createForClass(PlaneRuinsRewardConfig);

export const PlaneRuinsRewardConfigModel = {
    name: PlaneRuinsRewardConfig.name,
    schema: PlaneRuinsRewardConfigSchema,
    collection: 'planeRuinsRewardConfig'
};
