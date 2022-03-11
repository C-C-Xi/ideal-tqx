import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsTaskMainLineGame extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    RoomId: number;

    @Prop({default: 0})
    Icon: number;

    @Prop({default: 0})
    MainLineId: number;

    @Prop({default: 0})
    Stage: number;

    @Prop({default: 0})
    Order: number;

    @Prop({default: ''})
    BasicRewards: string;

    @Prop({default: ''})
    BasicRequirs: string;
}

export const ConfigSlotsTaskMainLineGameSchema = SchemaFactory.createForClass(ConfigSlotsTaskMainLineGame);

export const ConfigSlotsTaskMainLineGameModel = {
    name: ConfigSlotsTaskMainLineGame.name,
    schema: ConfigSlotsTaskMainLineGameSchema,
    collection: 'ConfigSlots_TaskMainLineGameConfig'
};
