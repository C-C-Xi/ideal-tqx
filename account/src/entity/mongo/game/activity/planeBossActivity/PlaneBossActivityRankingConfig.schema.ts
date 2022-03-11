import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityRankingConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    start: number;

    @Prop()
    end: number;

    @Prop()
    proportion: number;


}

export const PlaneBossActivityRankingConfigSchema = SchemaFactory.createForClass(PlaneBossActivityRankingConfig);

export const PlaneBossActivityRankingConfigModel = {
    name: PlaneBossActivityRankingConfig.name,
    schema: PlaneBossActivityRankingConfigSchema,
    collection: 'planeBossActivityRankingConfig'
};
