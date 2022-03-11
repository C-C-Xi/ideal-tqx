import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class FruitLabaProbabilityConfig extends Document {
    @Prop()
    combinedId: number;

    @Prop()
    isPureEarn: boolean;

    @Prop(raw([{
        step: {type: Number},
        num: {type: Number}
    }]))
    forceProtStep: Record<string, any>;

    @Prop()
    probability: object;
}

export const FruitLabaProbabilityConfigSchema = SchemaFactory.createForClass(FruitLabaProbabilityConfig);

export const FruitLabaProbabilityConfigModel = {
    name: FruitLabaProbabilityConfig.name,
    schema: FruitLabaProbabilityConfigSchema,
    collection: 'fruitLabaProbabilityConfig'
};
