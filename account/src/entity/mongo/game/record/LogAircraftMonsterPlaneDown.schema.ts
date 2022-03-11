import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class LogAircraftMonsterPlaneDown extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    TimeTSMS: number;
}

export const LogAircraftMonsterPlaneDownSchema = SchemaFactory.createForClass(LogAircraftMonsterPlaneDown);

export const LogAircraftMonsterPlaneDownModel = {
    name: LogAircraftMonsterPlaneDown.name,
    schema: LogAircraftMonsterPlaneDownSchema,
    collection: 'LOG_AircraftMonsterPlaneDown'
};
