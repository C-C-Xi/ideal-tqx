import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ChannelReport extends Document {
    @Prop()
    qid: number;

    @Prop()
    newUser: number;

    @Prop()
    activeUser: number;

    @Prop()
    rechargeUser: number;

    @Prop()
    rechargeMoney: number;

    @Prop()
    exchangeMoney: number;

    @Prop({default: 0})
    expend: number;

    @Prop()
    dateTime: number;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const ChannelReportSchema = SchemaFactory.createForClass(ChannelReport);

export const ChannelReportModel = {
    name: ChannelReport.name,
    schema: ChannelReportSchema,
    collection: 'RP_ChannelReport'
};
