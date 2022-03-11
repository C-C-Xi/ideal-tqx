import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class OnlineUser extends Document {
    @Prop({type:SchemaTypes.Long})
    time;

    @Prop()
    onlineUser: number;
}

export const OnlineUserSchema = SchemaFactory.createForClass(OnlineUser);

export const OnlineUserModel = {
    name: OnlineUser.name,
    schema: OnlineUserSchema,
    collection: 'onlineuser'
};
