import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftPoolConfig extends Document {
    @Prop()
    poolId: number;

    @Prop()
    name: string;

    @Prop(raw([{
        upperNum: {type: SchemaTypes.Long},
        adj: {type: SchemaTypes.Long}
    }]))
    poolsCtrl: Record<string, any>;
}

export const AircraftPoolConfigSchema = SchemaFactory.createForClass(AircraftPoolConfig);

export const AircraftPoolConfigModel ={
    name: AircraftPoolConfig.name,
    schema: AircraftPoolConfigSchema,
    collection: 'aircraftPoolConfig'
};
