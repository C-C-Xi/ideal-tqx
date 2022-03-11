import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftMapConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    tideTime: number;

    @Prop()
    tideFormationGroup: string;

    @Prop()
    tideFormationWeight: string;

    @Prop()
    tideIntervalTime: string;

    @Prop()
    res: string;

    @Prop()
    scroll: number;

    @Prop()
    bgm: number;
}

export const AircraftMapConfigSchema = SchemaFactory.createForClass(AircraftMapConfig);

export const AircraftMapConfigModel = {
    name: AircraftMapConfig.name,
    schema: AircraftMapConfigSchema,
    collection: 'aircraftMapConfig'
};
