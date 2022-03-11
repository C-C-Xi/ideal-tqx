import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ServerHost extends Document {
    @Prop()
    serverName: String;

    @Prop()
    serverInnerPortStart: Number;

    @Prop()
    serverInnerIp: String;

    @Prop()
    serverPubPortStart: Number;

    @Prop()
    serverPubIp: String;
}

export const ServerHostSchema = SchemaFactory.createForClass(ServerHost);

export const ServerHostModel = {
    name: ServerHost.name,
    schema: ServerHostSchema,
    collection: 'serverHostConfig'
};
