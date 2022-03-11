import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//圈数奖励配置
@Schema()
export class TreasureHuntCircleBoxConfig extends Document {
    @Prop()
    configId: number;

    @Prop()
    name: string;

    @Prop()
    moveTurns: number;

    @Prop()
    order: number;

    @Prop()
    taskId: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    rewards: Record<string,any>;
}

export const TreasureHuntCircleBoxConfigSchema = SchemaFactory.createForClass(TreasureHuntCircleBoxConfig);

export const TreasureHuntCircleBoxConfigModel = {
    name: TreasureHuntCircleBoxConfig.name,
    schema: TreasureHuntCircleBoxConfigSchema,
    collection: 'treasureHuntCircleBoxConfig'
};
