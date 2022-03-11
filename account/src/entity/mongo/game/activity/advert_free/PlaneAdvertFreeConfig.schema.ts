import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlaneAdvertFreeConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    advertNum: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
        weight: {type: Number}
    }]))
    rewards: Record<string, any>;
}

export const PlaneAdvertFreeConfigSchema = SchemaFactory.createForClass(PlaneAdvertFreeConfig);

export const PlaneAdvertFreeConfigModel ={
    name: PlaneAdvertFreeConfig.name,
    schema: PlaneAdvertFreeConfigSchema,
    collection: 'planeAdvertFreeConfig'
};
