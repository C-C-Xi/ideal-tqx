import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class FruitLabaCombinedConfig extends Document {
    @Prop()
    combinedId: number;

    @Prop()
    upplerLimit: number;
}

export const FruitLabaCombinedConfigSchema = SchemaFactory.createForClass(FruitLabaCombinedConfig);

export const FruitLabaCombinedConfigModel = {
    name: FruitLabaCombinedConfig.name,
    schema: FruitLabaCombinedConfigSchema,
    collection: 'fruitLabaCombinedConfig'
};
