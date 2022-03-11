import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogChangesDiamond extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogChangesDiamondSchema = SchemaFactory.createForClass(LogChangesDiamond);

export const LogChangesDiamondModel = {
    name: LogChangesDiamond.name,
    schema: LogChangesDiamondSchema,
    collection: 'LOG_ChangesDiamond'
};
