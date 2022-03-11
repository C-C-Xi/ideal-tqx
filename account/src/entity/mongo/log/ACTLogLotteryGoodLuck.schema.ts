import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ACTLogLotteryGoodLuck extends Document {
    @Prop()
    periodType: number;

    @Prop()
    periodId: number;

    @Prop()
    uid: number;

    @Prop()
    qid: number;

    @Prop()
    appType: number;

    @Prop({default:0})
    rewardsGold: number;

    @Prop({default:0})
    rewardsRedpack: number;

    @Prop({default:0})
    rewardsMoney: number;

    //消耗礼券
    @Prop({default:0})
    costRedpack: number;

    //返还礼券
    @Prop({default:0})
    returnRedpack: number;

    @Prop()
    status: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const ACTLogLotteryGoodLuckSchema = SchemaFactory.createForClass(ACTLogLotteryGoodLuck);

export const ACTLogLotteryGoodLuckModel = {
    name: ACTLogLotteryGoodLuck.name,
    schema: ACTLogLotteryGoodLuckSchema,
    collection: 'ACTLog_LotteryGoodLuck'
};
