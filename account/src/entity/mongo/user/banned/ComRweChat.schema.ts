import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ComRweChat extends Document {
    @Prop()
    unionId: string;

    @Prop({default: 0})
    status: number;

    @Prop({type: SchemaTypes.Long})
    updateTime;


    @Prop({default: ''})
    remark: string;
}

export const ComRweChatSchema = SchemaFactory.createForClass(ComRweChat);

if (process.env.PLATFORM_TYPE == 'ldzj') {
    //定义索引
    ComRweChatSchema.index({updateTime: -1}, {background: true, name: 'ComR_weChat_updateTime'});
    ComRweChatSchema.index({unionId: 'hashed'}, {background: true, unique: true, name: 'ComR_weChat_unionId'});
}

export const ComRweChatModel = {
    name: ComRweChat.name,
    schema: ComRweChatSchema,
    collection: 'ComR_weChat'
};
