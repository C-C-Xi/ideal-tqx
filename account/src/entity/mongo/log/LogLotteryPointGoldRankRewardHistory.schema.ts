import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";


mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogLotteryPointGoldRankRewardHistory extends Document {


    @Prop({type: SchemaTypes.Long})
    Time;
    @Prop()
    PlayerId:number;
}

export const LogLotteryPointGoldRankRewardHistorySchema = SchemaFactory.createForClass(LogLotteryPointGoldRankRewardHistory);

//定义索引
LogLotteryPointGoldRankRewardHistorySchema.index({Time: -1}, {background: true, name: 'LOG_LotteryPointGoldRankRewardHistory_Time'});
LogLotteryPointGoldRankRewardHistorySchema.index({PlayerId: -1}, {background: true, name: 'LOG_LotteryPointGoldRankRewardHistory_PlayerId'});

export const LogLotteryPointGoldRankRewardHistoryModel = {
    name: LogLotteryPointGoldRankRewardHistory.name,
    schema: LogLotteryPointGoldRankRewardHistorySchema,
    collection: 'LOG_LotteryPointGoldRankRewardHistory'
};
