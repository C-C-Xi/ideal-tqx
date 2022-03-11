import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlaneAdvertFreeCommonConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    desc: string;

    @Prop()
    maxValue: number;

    @Prop()
    minValue: number;

}

export const PlaneAdvertFreeCommonConfigSchema = SchemaFactory.createForClass(PlaneAdvertFreeCommonConfig);

export const PlaneAdvertFreeCommonConfigModel = {
    name: PlaneAdvertFreeCommonConfig.name,
    schema: PlaneAdvertFreeCommonConfigSchema,
    collection: 'planeAdvertFreeCommonConfig'
};
