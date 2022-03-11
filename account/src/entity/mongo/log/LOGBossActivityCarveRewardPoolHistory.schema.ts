import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LOGBossActivityCarveRewardPoolHistory extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LOGBossActivityCarveRewardPoolHistorySchema = SchemaFactory.createForClass(LOGBossActivityCarveRewardPoolHistory);

export const LOGBossActivityCarveRewardPoolHistoryModel = {
    name: LOGBossActivityCarveRewardPoolHistory.name,
    schema: LOGBossActivityCarveRewardPoolHistorySchema,
    collection: 'LOG_BossActivityCarveRewardPoolHistory'
};
