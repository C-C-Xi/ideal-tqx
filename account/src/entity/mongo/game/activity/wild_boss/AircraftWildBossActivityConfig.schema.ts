import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftWildBossActivityConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    Name: string;

    // @Prop()
    // Describe: string;
    //
    // //开始结束时间（配表使用）
    // @Prop()
    // OpenTime: string;
    //
    // @Prop()
    // DurationTime: number;

    //开始结束时间（游服使用）
    // @Prop()
    // OpenTimeDaily: number;
    //
    // @Prop()
    // EndTimeDaily: number;

    @Prop()
    RoomType: number;

    @Prop()
    MaxRewards: number;

    @Prop()
    RewardConfigId: number;

    // @Prop()
    // Activate: boolean;
    //
    // @Prop()
    // Button: string;
}

export const AircraftWildBossActivityConfigSchema = SchemaFactory.createForClass(AircraftWildBossActivityConfig);

export const AircraftWildBossActivityConfigModel = {
    name: AircraftWildBossActivityConfig.name,
    schema: AircraftWildBossActivityConfigSchema,
    collection: 'aircraftWildBossActivityConfig'
};
