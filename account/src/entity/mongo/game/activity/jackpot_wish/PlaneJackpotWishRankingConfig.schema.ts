import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneJackpotWishRankingConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    rankingMin: number;

    @Prop()
    rankingMax: number;

    @Prop()
    proportion: number;




}

export const PlaneJackpotWishRankingConfigSchema = SchemaFactory.createForClass(PlaneJackpotWishRankingConfig);

export const PlaneJackpotWishRankingConfigModel = {
    name: PlaneJackpotWishRankingConfig.name,
    schema: PlaneJackpotWishRankingConfigSchema,
    collection: 'planeJackpotWishRankingConfig'
};
