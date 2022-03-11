import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class RankAdvacnedRewardConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    rankId: number;

    @Prop()
    rankName: string;

    @Prop()
    lowerLimit: number;

    @Prop()
    upperLimit: number;

    @Prop({default: 0})
    rewardType: number;

    @Prop({default: 0})
    rewardItemId: number;

    @Prop({default: 0})
    rewardNum: number;

    @Prop()
    carveRate: number;

    @Prop()
    reward2pool: number;

    @Prop()
    isOccRatio: boolean;
}

export const RankAdvacnedRewardConfigSchema = SchemaFactory.createForClass(RankAdvacnedRewardConfig);

export const RankAdvacnedRewardConfigModel = {
    name: RankAdvacnedRewardConfig.name,
    schema: RankAdvacnedRewardConfigSchema,
    collection: 'rankAdvacnedRewardConfig'
};
