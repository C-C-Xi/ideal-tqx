import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ToBlackHousePrisoners extends Document {
    @Prop(raw({type: Array, default: []}))
    Prisoners: Record<string, any>;

    @Prop(raw({type: Array, default: []}))
    PrisonersTrial: Record<string, any>;
}

export const ToBlackHousePrisonersSchema = SchemaFactory.createForClass(ToBlackHousePrisoners);

export const ToBlackHousePrisonersModel = {
    name: ToBlackHousePrisoners.name,
    schema: ToBlackHousePrisonersSchema,
    collection: 'TO_BlackHousePrisoners'
};
