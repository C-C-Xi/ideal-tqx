import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class GiftBagRankingConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    minRank: number;


    @Prop()
    maxRank: number;


    @Prop()
    proportion: number;


}

export const GiftBagRankingConfigSchema = SchemaFactory.createForClass(GiftBagRankingConfig);

export const GiftBagRankingConfigModel = {
    name: GiftBagRankingConfig.name,
    schema: GiftBagRankingConfigSchema,
    collection: 'planeGiftBagRankingConfig'
};
