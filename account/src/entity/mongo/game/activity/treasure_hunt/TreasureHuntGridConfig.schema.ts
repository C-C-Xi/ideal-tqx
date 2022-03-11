import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//格子奖励配置
@Schema()
export class TreasureHuntGridConfig extends Document {
    @Prop()
    configId: number;

    @Prop()
    gridId: number;

    @Prop()
    num: number;

    @Prop()
    gridType: number;

    @Prop({type: SchemaTypes.Long})
    gridWorth;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    rewardItem: Record<string, any>;

}

export const TreasureHuntGridConfigSchema = SchemaFactory.createForClass(TreasureHuntGridConfig);

export const TreasureHuntGridConfigModel = {
    name: TreasureHuntGridConfig.name,
    schema: TreasureHuntGridConfigSchema,
    collection: 'treasureHuntGridConfig'
};
