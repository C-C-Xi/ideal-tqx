import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ChannelActivateUser extends Document {
    @Prop()
    uid: number;

    @Prop()
    qid: number;

    @Prop()
    num: number;

    @Prop({type:SchemaTypes.Long})
    time;
}

export const ChannelActivateUserSchema = SchemaFactory.createForClass(ChannelActivateUser);

//定义索引
ChannelActivateUserSchema.index({uid: 1}, {background: true, name: 'activateUser_uid'});
ChannelActivateUserSchema.index({num:-1}, {background: true, name: 'activateUser_num'});

export const ChannelActivateUserModel = {
    name: ChannelActivateUser.name,
    schema: ChannelActivateUserSchema,
    collection: 'activateUser'
};
