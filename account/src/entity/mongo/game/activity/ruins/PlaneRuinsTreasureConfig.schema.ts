import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖品配置
@Schema()
export class PlaneRuinsTreasureConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    icon: string;

    @Prop()
    ultimateReward:number;

    @Prop()
    normalReward: number;

    @Prop()
    ultimateRewardLimit: number;

    @Prop()
    reqIntegral: number;
}

export const PlaneRuinsTreasureConfigSchema = SchemaFactory.createForClass(PlaneRuinsTreasureConfig);

export const PlaneRuinsTreasureConfigModel = {
    name: PlaneRuinsTreasureConfig.name,
    schema: PlaneRuinsTreasureConfigSchema,
    collection: 'planeRuinsTreasureConfig'
};
