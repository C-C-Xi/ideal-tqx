import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ServerApp extends Document {
    @Prop()
    appId: Number;

    @Prop()
    appType: Number;

    @Prop()
    belongToServer: String;
}

export const ServerAppSchema = SchemaFactory.createForClass(ServerApp);

export const ServerAppModel = {
    name: ServerApp.name,
    schema: ServerAppSchema,
    collection: 'serverAppConfig'
};
