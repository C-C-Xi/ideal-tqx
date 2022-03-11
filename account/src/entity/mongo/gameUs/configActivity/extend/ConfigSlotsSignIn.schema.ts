import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsSignIn extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Type: number;

    @Prop({default: 0})
    Day: number;

    @Prop({default: ''})
    GetItem: string;
}

export const ConfigSlotsSignInSchema = SchemaFactory.createForClass(ConfigSlotsSignIn);

export const ConfigSlotsSignInModel = {
    name: ConfigSlotsSignIn.name,
    schema: ConfigSlotsSignInSchema,
    collection: 'ConfigSlots_SignIn'
};
