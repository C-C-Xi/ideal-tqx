import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlaneVideoConfig extends Document {

    @Prop({default:0})
    id: number;

    @Prop()
    videoType: number;

    @Prop()
    value : number;

    @Prop()
    limitNum : number;

    @Prop()
    remark : string;

}

export const PlaneVideoConfigSchema = SchemaFactory.createForClass(PlaneVideoConfig);

export const PlaneVideoConfigModel = {
    name: PlaneVideoConfig.name,
    schema: PlaneVideoConfigSchema,
    collection: 'planeVideoConfig'
};


