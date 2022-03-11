import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class LabelReleaseConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    pagId: number;

    @Prop()
    pagName: string;

    @Prop()
    order: number;

    @Prop()
    state: number;
}

export const LabelReleaseConfigSchema = SchemaFactory.createForClass(LabelReleaseConfig);

export const LabelReleaseConfigModel = {
    name: LabelReleaseConfig.name,
    schema: LabelReleaseConfigSchema,
    collection: 'shopLabelReleaseConfig'
};
