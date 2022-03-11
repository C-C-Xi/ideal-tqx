import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class TreasureActivitiesRankingConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    minRank: number;


    @Prop()
    maxRank: number;


    @Prop()
    proportion: number;


}

export const TreasureActivitiesRankingConfigSchema = SchemaFactory.createForClass(TreasureActivitiesRankingConfig);

export const TreasureActivitiesRankingConfigModel = {
    name: TreasureActivitiesRankingConfig.name,
    schema: TreasureActivitiesRankingConfigSchema,
    collection: 'treasureActivitiesRankingConfig'
};
