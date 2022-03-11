import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PersonalPoolDailyConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    playType: number;

    @Prop({type:SchemaTypes.Long})
    todayRecharge;

    @Prop()
    winBase: number;

    @Prop(raw([{
        rate: {type: Number, default: 0},
        weight: {type: Number, default: 0}
    }]))
    winGolds: Record<string, any>;
}

export const PersonalPoolDailyConfigSchema = SchemaFactory.createForClass(PersonalPoolDailyConfig);

export const PersonalPoolDailyConfigModel = {
    name: PersonalPoolDailyConfig.name,
    schema: PersonalPoolDailyConfigSchema,
    collection: 'personalPoolDailyConfig'
};
