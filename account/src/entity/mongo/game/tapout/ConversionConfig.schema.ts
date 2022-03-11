import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConversionConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    cybermoney: number;

    @Prop()
    count: number;

    @Prop()
    conversion: number;

    @Prop({type: SchemaTypes.Double, default: 0.00})
    realValue;

    @Prop({type: SchemaTypes.Double, default: 0.00})
    goldValue;
}

export const ConversionConfigSchema = SchemaFactory.createForClass(ConversionConfig);

export const ConversionConfigModel = {
    name: ConversionConfig.name,
    schema: ConversionConfigSchema,
    collection: 'conversionConfig'
};
