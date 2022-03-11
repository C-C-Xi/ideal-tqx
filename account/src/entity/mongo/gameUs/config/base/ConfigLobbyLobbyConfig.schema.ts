import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyLobby extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ""})
    Name: string;

    @Prop({default: 0})
    Type: number;

    @Prop({default: 0})
    RedDot: number;


    @Prop({default: 0})
    Param: number;


    @Prop({default: 0})
    Order: number;

    @Prop({default: 0})
    IsOpen: number;

    @Prop({default: 0})
    AboutOpen: number;

    @Prop({default: 0})
    Hot: number;

    @Prop({default: 0})
    New: number;

}

export const ConfigLobbyLobbySchema = SchemaFactory.createForClass(ConfigLobbyLobby);

export const ConfigLobbyLobbyModel = {
    name: ConfigLobbyLobby.name,
    schema: ConfigLobbyLobbySchema,
    collection: 'ConfigLobby_LobbyConfig'
};
