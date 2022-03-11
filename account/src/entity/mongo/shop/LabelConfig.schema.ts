import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class LabelConfig extends Document {
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

export const LabelConfigSchema = SchemaFactory.createForClass(LabelConfig);

export const LabelConfigModel = {
    name: LabelConfig.name,
    schema: LabelConfigSchema,
    collection: 'shopLabelConfig'
};
