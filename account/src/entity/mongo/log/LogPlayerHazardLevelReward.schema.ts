import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerHazardLevelReward extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerHazardLevelRewardSchema = SchemaFactory.createForClass(LogPlayerHazardLevelReward);

//定义索引
LogPlayerHazardLevelRewardSchema.index({PlayerId: -1}, {background: true, name: 'LOG_PlayerHazardLevelRewardSchema_PlayerId'});
LogPlayerHazardLevelRewardSchema.index({Time: -1}, {background: true, name: 'LOG_PlayerHazardLevelRewardSchema_Time'});

export const LogPlayerHazardLevelRewardModel = {
    name: LogPlayerHazardLevelReward.name,
    schema: LogPlayerHazardLevelRewardSchema,
    collection: 'LOG_PlayerCopyHistory'
};
