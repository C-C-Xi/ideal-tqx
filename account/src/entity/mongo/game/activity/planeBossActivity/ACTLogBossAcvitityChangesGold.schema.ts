import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ACTLogBossAcvitityChangesGold extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    appType: number;

    @Prop()
    qid: number;

    @Prop()
    extType2: number;

    @Prop()
    costGold: number;

    @Prop()
    getGold: number;

    @Prop()
    addPoolGold: number;


    @Prop()
    realPureEarn: number;
}

export const ACTLogBossAcvitityChangesGoldSchema = SchemaFactory.createForClass(ACTLogBossAcvitityChangesGold);


export const ACTLogBossAcvitityChangesGoldModel = {
    name: ACTLogBossAcvitityChangesGold.name,
    schema: ACTLogBossAcvitityChangesGoldSchema,
    collection: 'ACTLog_BossAcvitityChangesGold'
};
