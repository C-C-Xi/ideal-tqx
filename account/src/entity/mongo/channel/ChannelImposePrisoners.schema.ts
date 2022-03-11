import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ChannelImposePrisoners extends Document {
    @Prop()
    uid: number;

    @Prop()
    symbol: number;

    @Prop()
    recharge: number;

    @Prop()
    num: number;

    @Prop({default:''})
    node: string;

    @Prop()
    action: boolean;

    @Prop({type:SchemaTypes.Long})
    updateTime;
}

export const ChannelImposePrisonersSchema = SchemaFactory.createForClass(ChannelImposePrisoners);

//定义索引
ChannelImposePrisonersSchema.index({num: -1}, {background: true, name: 'ChannelImposePrisoners_num'});

export const ChannelImposePrisonersModel = {
    name: ChannelImposePrisoners.name,
    schema: ChannelImposePrisonersSchema,
    collection: 'channelImposePrisoners'
};
