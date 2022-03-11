import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogLotteryGiftBagRewardHistory extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogLotteryGiftBagRewardHistorySchema = SchemaFactory.createForClass(LogLotteryGiftBagRewardHistory);

export const LogLotteryGiftBagRewardHistoryModel = {
    name: LogLotteryGiftBagRewardHistory.name,
    schema: LogLotteryGiftBagRewardHistorySchema,
    collection: 'LOG_LotteryGiftBagRewardHistory'
};
