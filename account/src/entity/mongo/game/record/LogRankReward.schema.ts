import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogRankReward extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    RankType: number;

    @Prop()
    RankPos: number;

    @Prop()
    RoomType: number;

    @Prop()
    GetItems:object;

    @Prop({type:SchemaTypes.Long})
    Time;
}

export const LogRankRewardSchema = SchemaFactory.createForClass(LogRankReward);

export const LogRankRewardModel = {
    name: LogRankReward.name,
    schema: LogRankRewardSchema,
    collection: 'LOG_RankReward'
};
