import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class AircraftJackpotDivideConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    room: number;

    @Prop()
    gunId: number;

    @Prop()
    gun: number;

    @Prop()
    jackpotNum: number;

    @Prop()
    percent: number;
}

export const AircraftJackpotDivideConfigSchema = SchemaFactory.createForClass(AircraftJackpotDivideConfig);

export const AircraftJackpotDivideConfigModel ={
    name: AircraftJackpotDivideConfig.name,
    schema: AircraftJackpotDivideConfigSchema,
    collection: 'aircraftJackpotDivideConfig'
};
