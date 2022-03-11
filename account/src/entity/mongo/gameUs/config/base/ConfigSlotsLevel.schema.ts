import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsLevel extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    UpLevelExp;

    @Prop({default: ''})
    BetExp: string;

    @Prop({type: SchemaTypes.Long, default: 0})
    RewardGold;

    @Prop({type: SchemaTypes.Long, default: 0})
    RewardVipExp;

    @Prop({default: 0})
    SpUp: number;
}

export const ConfigSlotsLevelSchema = SchemaFactory.createForClass(ConfigSlotsLevel);

export const ConfigSlotsLevelModel = {
    name: ConfigSlotsLevel.name,
    schema: ConfigSlotsLevelSchema,
    collection: 'ConfigSlots_Level'
};
