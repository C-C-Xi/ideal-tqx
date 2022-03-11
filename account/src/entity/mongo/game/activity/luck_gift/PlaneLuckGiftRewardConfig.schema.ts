import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖品配置
@Schema()
export class PlaneLuckGiftRewardConfig extends Document {
    @Prop()
    id: number;



    @Prop()
    weight: number;


    @Prop(raw({
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }))
    rewards: Record<string, any>;
}

export const PlaneLuckGiftRewardConfigSchema = SchemaFactory.createForClass(PlaneLuckGiftRewardConfig);

export const PlaneLuckGiftRewardConfigModel = {
    name: PlaneLuckGiftRewardConfig.name,
    schema: PlaneLuckGiftRewardConfigSchema,
    collection: 'planeLuckgiftRewardConfig'
};
