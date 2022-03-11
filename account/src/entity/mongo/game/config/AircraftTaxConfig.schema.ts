import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftTaxConfig extends Document {
    @Prop()
    roomType: number;

    @Prop()
    betSysRate: number;

    @Prop()
    betRankRate: number;

    @Prop()
    betPoolRate: number;

    @Prop()
    earnSysRate: number;

    @Prop()
    earnRankRate: number;

    @Prop()
    earnPoolRate: number;
}

export const AircraftTaxConfigSchema = SchemaFactory.createForClass(AircraftTaxConfig);

export const AircraftTaxConfigModel = {
    name: AircraftTaxConfig.name,
    schema: AircraftTaxConfigSchema,
    collection: 'aircraftTaxConfig'
};
