import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ChannelExpend extends Document {
    @Prop()
    num: number;

    @Prop()
    qid: number;

    @Prop()
    channelName:string;

    @Prop()
    totalExpendMoney: number;

    @Prop()
    totalRegisterPlayer: number;

    @Prop()
    data: object;

    @Prop()
    newUserData: object;

    @Prop()
    todayNewUserData:object;

    @Prop()
    dateTime: number;
}

export const ChannelExpendSchema = SchemaFactory.createForClass(ChannelExpend);

//定义索引
ChannelExpendSchema.index({uid: -1}, {background: true, name: 'CHANNEL_Expend_uid'});
ChannelExpendSchema.index({dateTime: -1}, {background: true, name: 'CHANNEL_Expend_dateTime'});

export const ChannelExpendModel = {
    name: ChannelExpend.name,
    schema: ChannelExpendSchema,
    collection: 'CHANNEL_Expend'
};
