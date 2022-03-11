import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ScreenTime extends Document {
    @Prop()
    id: number;

    @Prop()
    year: number;

    @Prop()
    month: number;

    @Prop()
    days: string;

}

export const ScreenTimeSchema = SchemaFactory.createForClass(ScreenTime);

export const ScreenTimeModel = {
    name: ScreenTime.name,
    schema: ScreenTimeSchema,
    collection: 'screenTimeConfig'
};
