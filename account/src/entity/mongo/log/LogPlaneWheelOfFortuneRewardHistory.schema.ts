import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlaneWheelOfFortuneRewardHistory extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlaneWheelOfFortuneRewardHistorySchema = SchemaFactory.createForClass(LogPlaneWheelOfFortuneRewardHistory);

export const LogPlaneWheelOfFortuneRewardHistoryModel = {
    name: LogPlaneWheelOfFortuneRewardHistory.name,
    schema: LogPlaneWheelOfFortuneRewardHistorySchema,
    collection: 'LOG_PlaneWheelOfFortuneRewardHistory'
};
