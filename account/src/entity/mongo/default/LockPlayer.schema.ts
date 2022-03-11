import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LockPlayer extends Document {
    @Prop()
    uid: number;

    @Prop()
    lock: number;

    @Prop()
    remark: string;

    @Prop()
    white: number;

    @Prop({type:SchemaTypes.Long})
    kickOut;

    @Prop({default: 0})
    forbidBuy: number;

    @Prop({default: 0})
    bate: number;
}

export const LockPlayerSchema = SchemaFactory.createForClass(LockPlayer);

export const LockPlayerModel = {
    name: LockPlayer.name,
    schema: LockPlayerSchema,
    collection: 'lockPlayer'
};
