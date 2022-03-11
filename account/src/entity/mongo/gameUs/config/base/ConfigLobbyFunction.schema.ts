import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyFunction extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ""})
    Key: string;

    @Prop({default: 0})
    VipLimit: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    GoldLimit: number;

    @Prop({default: 0})
    LevelLimit: number;
}

export const ConfigLobbyFunctionSchema = SchemaFactory.createForClass(ConfigLobbyFunction);

export const ConfigLobbyFunctionModel = {
    name: ConfigLobbyFunction.name,
    schema: ConfigLobbyFunctionSchema,
    collection: 'ConfigLobby_FunctionConfig'
};
