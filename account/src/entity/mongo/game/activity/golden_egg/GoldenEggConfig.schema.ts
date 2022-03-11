import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GoldenEggConfig extends Document {
    @Prop({type:SchemaTypes.Long})
    beginTimeMS;

    @Prop({type:SchemaTypes.Long})
    finishTimeMS;
}

export const GoldenEggConfigSchema = SchemaFactory.createForClass(GoldenEggConfig);

export const GoldenEggConfigModel = {
    name: GoldenEggConfig.name,
    schema: GoldenEggConfigSchema,
    collection: 'goldenEggConfig'
};
