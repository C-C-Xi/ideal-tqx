import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsUserNewProtect extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default:0})
    Day: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    Gold;

    @Prop({default:0})
    PlayType: number;
}

export const ConfigSlotsUserNewProtectSchema = SchemaFactory.createForClass(ConfigSlotsUserNewProtect);

export const ConfigSlotsUserNewProtectModel = {
    name: ConfigSlotsUserNewProtect.name,
    schema: ConfigSlotsUserNewProtectSchema,
    collection: 'ConfigSlots_UserNewProtect'
};
