import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlayerOnlineData extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    type: number;

    @Prop()
    onlineTime: number;

    @Prop()
    loginNum: number;

    @Prop()
    vipLv: number;

    @Prop()
    beginTime: number;

    @Prop()
    endTime: number;

    @Prop()
    dateTime: number;
}

export const PlayerOnlineDataSchema = SchemaFactory.createForClass(PlayerOnlineData);

export const PlayerOnlineDataModel = {
    name: PlayerOnlineData.name,
    schema: PlayerOnlineDataSchema,
    collection: 'SD_PlayerOnlineData'
};
