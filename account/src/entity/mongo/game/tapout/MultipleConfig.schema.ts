import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class MultipleConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    skill: number;

    @Prop()
    count: number;

    @Prop()
    multiple: number;

    @Prop()
    msg: string;
}

export const MultipleConfigSchema = SchemaFactory.createForClass(MultipleConfig);

export const MultipleConfigModel = {
    name: MultipleConfig.name,
    schema: MultipleConfigSchema,
    collection: 'multipleConfig'
};
