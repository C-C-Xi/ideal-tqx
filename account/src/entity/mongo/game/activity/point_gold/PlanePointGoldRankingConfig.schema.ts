import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlanePointGoldRankingConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    rankingMin: number;

    @Prop()
    rankingMax: number;

    @Prop()
    proportion: number;




}

export const PlanePointGoldRankingConfigSchema = SchemaFactory.createForClass(PlanePointGoldRankingConfig);

export const PlanePointGoldRankingConfigModel = {
    name: PlanePointGoldRankingConfig.name,
    schema: PlanePointGoldRankingConfigSchema,
    collection: 'planePointGoldRankingConfig'
};
