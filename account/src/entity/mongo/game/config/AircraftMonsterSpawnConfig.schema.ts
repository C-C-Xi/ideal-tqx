import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

//飞机刷怪表
@Schema()
export class AircraftMonsterSpawnConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    room: number;

    @Prop()
    type: number;

    @Prop()
    monster: string;

    @Prop()
    weight: string;

    @Prop()
    num: number;

    @Prop()
    interval: number;

    @Prop()
    appear: number;

    @Prop()
    loop: number;

    @Prop()
    minNum: number;

    @Prop()
    maxNum: number;

    @Prop()
    node: string;

    @Prop()
    deDuplication: number;
}

export const AircraftMonsterSpawnConfigSchema = SchemaFactory.createForClass(AircraftMonsterSpawnConfig);

export const AircraftMonsterSpawnConfigModel = {
    name: AircraftMonsterSpawnConfig.name,
    schema: AircraftMonsterSpawnConfigSchema,
    collection: 'aircraftMonsterSpawnConfig'
};
