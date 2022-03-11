import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PersonalPoolGlobalConfig extends Document {

    @Prop()
    paymentEffectiveTime: number;

    @Prop({type: SchemaTypes.Long})
    minPersonalPoolDaily;

    @Prop()
    dailyPoolType: number;
}

export const PersonalPoolGlobalConfigSchema = SchemaFactory.createForClass(PersonalPoolGlobalConfig);

export const PersonalPoolGlobalConfigModel = {
    name: PersonalPoolGlobalConfig.name,
    schema: PersonalPoolGlobalConfigSchema,
    collection: 'personalPoolGlobalConfig'
};
