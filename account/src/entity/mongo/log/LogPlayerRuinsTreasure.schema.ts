import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerRuinsTreasure extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerRuinsTreasureSchema = SchemaFactory.createForClass(LogPlayerRuinsTreasure);

export const LogPlayerRuinsTreasureModel = {
    name: LogPlayerRuinsTreasure.name,
    schema: LogPlayerRuinsTreasureSchema,
    collection: 'LOG_PlayerRuinsTreasure'
};
