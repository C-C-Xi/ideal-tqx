import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftJackpotConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;
}

export const AircraftJackpotConfigSchema = SchemaFactory.createForClass(AircraftJackpotConfig);

export const AircraftJackpotConfigModel ={
    name: AircraftJackpotConfig.name,
    schema: AircraftJackpotConfigSchema,
    collection: 'aircraftJackpotConfig'
};
