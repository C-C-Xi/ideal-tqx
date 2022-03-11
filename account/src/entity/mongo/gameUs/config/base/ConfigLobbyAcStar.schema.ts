import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyAcStar extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ""})
    GameStarTrigger: string;

    @Prop({default: 0})
    PlayStarTrigger: number;

    @Prop({default: 0})
    PlayStar: number;

}

export const ConfigLobbyAcStarSchema = SchemaFactory.createForClass(ConfigLobbyAcStar);

export const ConfigLobbyAcStarModel = {
    name: ConfigLobbyAcStar.name,
    schema: ConfigLobbyAcStarSchema,
    collection: 'ConfigLobby_AcStarConfig'
};
