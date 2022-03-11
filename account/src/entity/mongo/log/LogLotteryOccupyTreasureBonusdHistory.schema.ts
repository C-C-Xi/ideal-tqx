import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogLotteryOccupyTreasureBonusdHistory extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogLotteryOccupyTreasureBonusdHistorySchema = SchemaFactory.createForClass(LogLotteryOccupyTreasureBonusdHistory);

export const LogLotteryOccupyTreasureBonusdHistoryModel = {
    name: LogLotteryOccupyTreasureBonusdHistory.name,
    schema: LogLotteryOccupyTreasureBonusdHistorySchema,
    collection: 'LOG_LotteryOccupyTreasureBonusdHistory'
};
