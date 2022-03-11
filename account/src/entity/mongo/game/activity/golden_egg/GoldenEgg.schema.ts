import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class GoldenEgg extends Document {
    @Prop()
    id: number;

    @Prop()
    eggName: string;

    @Prop()
    costItem: object;
}

export const GoldenEggSchema = SchemaFactory.createForClass(GoldenEgg);

export const GoldenEggModel = {
    name: GoldenEgg.name,
    schema: GoldenEggSchema,
    collection: 'goldenEgg'
};
