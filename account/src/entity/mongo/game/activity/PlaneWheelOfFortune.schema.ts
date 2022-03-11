import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneWheelOfFortune extends Document {
    @Prop()
    Id: number;

    @Prop()
    Name: string;

    @Prop()
    Order: number;

    @Prop()
    AwardGroupId: number;

    @Prop()
    NeedIntegral: number;

    @Prop()
    BroadcastId: number;
}

export const PlaneWheelOfFortuneSchema = SchemaFactory.createForClass(PlaneWheelOfFortune);

export const PlaneWheelOfFortuneModel = {
    name: PlaneWheelOfFortune.name,
    schema: PlaneWheelOfFortuneSchema,
    collection: 'aircraftWheelOfFortuneConfig'
};
