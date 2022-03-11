import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class RankRewardConfig extends Document {
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

export const RankRewardConfigSchema = SchemaFactory.createForClass(RankRewardConfig);

export const RankRewardConfigModel = {
    name: RankRewardConfig.name,
    schema: RankRewardConfigSchema,
    collection: 'rankRewardConfig'
};
