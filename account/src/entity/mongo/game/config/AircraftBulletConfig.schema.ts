import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftBulletConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    gun: number;

    @Prop()
    room: number;

    @Prop({default: -1 })
    playType: number;

    @Prop()
    redpack: number;

    @Prop()
    normRate: number;

    @Prop()
    normPoolIndex: number;

    @Prop()
    redpackRate: number;

    @Prop()
    redpackPoolIndex: number;

    @Prop()
    rewardBoxRate: number;

    @Prop()
    rewardBoxPoolIndex: number;

    @Prop()
    bombRate: number;

    @Prop()
    bombPoolIndex: number;

    @Prop()
    status: boolean;
}

export const AircraftBulletConfigSchema = SchemaFactory.createForClass(AircraftBulletConfig);

export const AircraftBulletConfigModel = {
    name: AircraftBulletConfig.name,
    schema: AircraftBulletConfigSchema,
    collection: 'aircraftBulletConfig'
};
