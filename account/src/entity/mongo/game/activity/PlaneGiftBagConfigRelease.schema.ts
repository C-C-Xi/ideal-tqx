import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneGiftBagConfigRelease extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop(raw([{
        itemId: {type: Number},
        type: {type: Number},
        num: {type: Number}
    }]))
    day1: Record<string, any>;

    @Prop(raw([{
        itemId: {type: Number},
        type: {type: Number},
        num: {type: Number}
    }]))
    day2: Record<string, any>;

    @Prop(raw([{
        itemId: {type: Number},
        type: {type: Number},
        num: {type: Number}
    }]))
    day3: Record<string, any>;

    @Prop()
    nextId: number;
}

export const PlaneGiftBagConfigReleaseSchema = SchemaFactory.createForClass(PlaneGiftBagConfigRelease);

export const PlaneGiftBagConfigReleaseModel = {
    name: PlaneGiftBagConfigRelease.name,
    schema: PlaneGiftBagConfigReleaseSchema,
    collection: 'planeLinkShopRelease'
};
