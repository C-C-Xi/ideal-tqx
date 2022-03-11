import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftDropLimitConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    largeNum: number;

    @Prop()
    vip0: number;

    @Prop()
    vip1: number;

    @Prop()
    vip2: number;

    @Prop()
    vip3: number;

    @Prop()
    vip4: number;

    @Prop()
    vip5: number;

    @Prop()
    vip6: number;

    @Prop()
    vip7: number;

    @Prop()
    vip8: number;

    @Prop()
    vip9: number;

    @Prop()
    vip10: number;
}

export const AircraftDropLimitConfigSchema = SchemaFactory.createForClass(AircraftDropLimitConfig);

export const AircraftDropLimitConfigModel = {
    name: AircraftDropLimitConfig.name,
    schema: AircraftDropLimitConfigSchema,
    collection: 'aircraftDropLimitConfig'
};
