import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyGrandPush extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    BetTimes: number;
}

export const ConfigLobbyGrandPushSchema = SchemaFactory.createForClass(ConfigLobbyGrandPush);

export const ConfigLobbyGrandPushModel = {
    name: ConfigLobbyGrandPush.name,
    schema: ConfigLobbyGrandPushSchema,
    collection: 'ConfigSlots_GrandPush'
};
