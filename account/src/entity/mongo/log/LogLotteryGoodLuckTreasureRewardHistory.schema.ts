import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";


mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogLotteryGoodLuckTreasureRewardHistory extends Document {


    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogLotteryGoodLuckTreasureRewardHistorySchema = SchemaFactory.createForClass(LogLotteryGoodLuckTreasureRewardHistory);

//定义索引
LogLotteryGoodLuckTreasureRewardHistorySchema.index({Time: -1}, {background: true, name: 'LOG_LotteryGoodLuckTreasureRewardHistory_Time'});

export const LogLotteryGoodLuckTreasureRewardHistoryModel = {
    name: LogLotteryGoodLuckTreasureRewardHistory.name,
    schema: LogLotteryGoodLuckTreasureRewardHistorySchema,
    collection: 'LOG_LotteryGoodLuckTreasureRewardHistory'
};
