import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerLottery extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerLotterySchema = SchemaFactory.createForClass(LogPlayerLottery);

export const LogPlayerLotteryModel = {
    name: LogPlayerLottery.name,
    schema: LogPlayerLotterySchema,
    collection: 'LOG_PlayerLottery'
};
