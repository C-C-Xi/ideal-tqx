import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerHuntLevelReward extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerHuntLevelRewardSchema = SchemaFactory.createForClass(LogPlayerHuntLevelReward);

//定义索引
LogPlayerHuntLevelRewardSchema.index({PlayerId: -1}, {background: true, name: 'LOG_PlayerHuntLevelReward_PlayerId'});
LogPlayerHuntLevelRewardSchema.index({Time: -1}, {background: true, name: 'LOG_PlayerHuntLevelReward_Time'});

export const LogPlayerHuntLevelRewardModel = {
    name: LogPlayerHuntLevelReward.name,
    schema: LogPlayerHuntLevelRewardSchema,
    collection: 'LOG_PlayerHuntLevelReward'
};
