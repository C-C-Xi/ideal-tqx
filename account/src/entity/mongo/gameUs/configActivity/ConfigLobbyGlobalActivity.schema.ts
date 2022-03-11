import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyGlobalActivity extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    NameId: number;

    @Prop({default: ''})
    Name: string;

    @Prop({default: 0})
    DescribeId: number;

    @Prop({default: 0})
    Type: number;

    @Prop({default: 0})
    OpenRule: number;

    @Prop({default: 0})
    order: number;

    @Prop({default: 0})
    OpenTime: number;

    @Prop({default: 0})
    CloseTime: number;

    @Prop({default: 0})
    DailyLimit: number;

    @Prop({default: 0})
    Activate: number;

    @Prop({default: ""})
    Channel: string;

    @Prop({default: 0})
    Effect: number;

    @Prop({default: 0})
    VipLimit: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    GoldLimit: number;

    @Prop({default: 0})
    LevelLimit: number;
}

export const ConfigLobbyGlobalActivitySchema = SchemaFactory.createForClass(ConfigLobbyGlobalActivity);

export const ConfigLobbyGlobalActivityModel = {
    name: ConfigLobbyGlobalActivity.name,
    schema: ConfigLobbyGlobalActivitySchema,
    collection: 'ConfigLobby_GlobalActivityConfig'
};
