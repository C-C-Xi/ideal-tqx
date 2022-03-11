import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftWildBossRewardConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    RankConfig: object;
}

export const AircraftWildBossRewardConfigSchema = SchemaFactory.createForClass(AircraftWildBossRewardConfig);

export const AircraftWildBossRewardConfigModel = {
    name: AircraftWildBossRewardConfig.name,
    schema: AircraftWildBossRewardConfigSchema,
    collection: 'aircraftWildBossRewardConfig'
};
