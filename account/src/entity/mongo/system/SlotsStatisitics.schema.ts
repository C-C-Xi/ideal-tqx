import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class SlotsStatisitics extends Document {
    @Prop()
    roomId: number;


}

export const SlotsStatisiticsSchema = SchemaFactory.createForClass(SlotsStatisitics);

export const SlotsStatisiticsModel = {
    name: SlotsStatisitics.name,
    schema: SlotsStatisiticsSchema,
    collection: 'TO_SlotsStatisitics'
};
