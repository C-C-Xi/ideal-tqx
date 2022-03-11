import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class PersonalPoolTotallyConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    playType: number;

    @Prop({type: SchemaTypes.Long})
    totalRecharge;

    @Prop()
    winBaseRate: number;

    @Prop()
    randomRate: number;
}

export const PersonalPoolTotallyConfigSchema = SchemaFactory.createForClass(PersonalPoolTotallyConfig);

export const PersonalPoolTotallyConfigModel = {
    name: PersonalPoolTotallyConfig.name,
    schema: PersonalPoolTotallyConfigSchema,
    collection: 'personalPoolTotallyConfig'
};
