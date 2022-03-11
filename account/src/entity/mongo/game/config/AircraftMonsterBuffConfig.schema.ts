import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

//飞机BUFF表
@Schema()
export class AircraftMonsterBuffConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    type: number;

    @Prop()
    buffType: number;

    @Prop({default:0})
    duration: number;

    @Prop({default:0})
    frequency: number;

    @Prop()
    param: string;

    @Prop()
    overlay: number;

    @Prop()
    effect: number;

    @Prop()
    effect2: number;

    @Prop()
    mainBuffId: number;

}

export const AircraftMonsterBuffConfigSchema = SchemaFactory.createForClass(AircraftMonsterBuffConfig);

export const AircraftMonsterBuffConfigModel = {
    name: AircraftMonsterBuffConfig.name,
    schema: AircraftMonsterBuffConfigSchema,
    collection: 'aircraftMonsterBuffConfig'
};
