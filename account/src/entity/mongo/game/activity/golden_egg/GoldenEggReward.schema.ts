import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class GoldenEggReward extends Document {
    @Prop()
    id: number;

    @Prop()
    goldenEggId: number;

    @Prop()
    rewardItem: object;

    @Prop()
    isBroadcast: boolean;

    @Prop()
    personLimitDaily: number;

    @Prop()
    weight: number;
}

export const GoldenEggRewardSchema = SchemaFactory.createForClass(GoldenEggReward);

export const GoldenEggRewardModel = {
    name: GoldenEggReward.name,
    schema: GoldenEggRewardSchema,
    collection: 'goldenEggReward'
};
