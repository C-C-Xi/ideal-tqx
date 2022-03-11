import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftWildBossConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    RefreshConfig: object;
}

export const AircraftWildBossConfigSchema = SchemaFactory.createForClass(AircraftWildBossConfig);

export const AircraftWildBossConfigModel = {
    name: AircraftWildBossConfig.name,
    schema: AircraftWildBossConfigSchema,
    collection: 'aircraftWildBossConfig'
};
