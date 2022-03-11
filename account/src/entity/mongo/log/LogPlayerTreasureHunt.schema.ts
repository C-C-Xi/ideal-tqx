import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerTreasureHunt extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerTreasureHuntSchema = SchemaFactory.createForClass(LogPlayerTreasureHunt);

export const LogPlayerTreasureHuntModel = {
    name: LogPlayerTreasureHunt.name,
    schema: LogPlayerTreasureHuntSchema,
    collection: 'LOG_PlayerTreasureHunt'
};
