import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogLotteyRank extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogLotteyRankSchema = SchemaFactory.createForClass(LogLotteyRank);

export const LogLotteyRankModel = {
    name: LogLotteyRank.name,
    schema: LogLotteyRankSchema,
    collection: 'LOG_LotteryRank'
};
