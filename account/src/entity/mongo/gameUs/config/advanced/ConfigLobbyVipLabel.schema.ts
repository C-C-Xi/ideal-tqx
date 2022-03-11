import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigLobbyVipLabel extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    PagId: number;

    @Prop({default: ""})
    PagName: string;

    @Prop({default: 0})
    ShowType: number;

    @Prop({default: 0})
    Order: number;

}

export const ConfigLobbyVipLabelSchema = SchemaFactory.createForClass(ConfigLobbyVipLabel);

export const ConfigLobbyVipLabelModel = {
    name: ConfigLobbyVipLabel.name,
    schema: ConfigLobbyVipLabelSchema,
    collection: 'ConfigLobby_VipLabel'
};
