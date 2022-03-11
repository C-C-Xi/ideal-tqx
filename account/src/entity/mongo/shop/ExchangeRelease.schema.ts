import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ExchangeRelease extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;
}

export const ExchangeReleaseSchema = SchemaFactory.createForClass(ExchangeRelease);

export const ExchangeReleaseModel = {
    name: ExchangeRelease.name,
    schema: ExchangeReleaseSchema,
    collection: 'exchangeRelease'
};
