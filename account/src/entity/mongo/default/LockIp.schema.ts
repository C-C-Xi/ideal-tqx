import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LockIp extends Document {
    @Prop()
    ip: string;


}

export const LockIpSchema = SchemaFactory.createForClass(LockIp);

export const LockIpModel = {
    name: LockIp.name,
    schema: LockIpSchema,
    collection: 'lockip'
};