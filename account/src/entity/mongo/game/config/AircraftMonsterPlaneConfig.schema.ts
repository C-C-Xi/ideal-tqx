import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//飞机表
@Schema()
export class AircraftMonsterPlaneConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    plane: number;

    @Prop()
    type: number;

    @Prop({default: 0})
    playType: number;

    @Prop({default: 0})
    stageType: number;

    @Prop()
    closeType: number;

    @Prop()
    rate: number;

    @Prop()
    weight: number;

    @Prop()
    liftime: number;

    @Prop()
    speed: number;

    @Prop()
    path: string;

    @Prop()
    forward: number;

    @Prop()
    icon: string;

    @Prop()
    bombRange: number;

    @Prop()
    bombDelay: number;

    @Prop()
    effectCoinNum: number;

    @Prop()
    effectScore: string;

    @Prop()
    effectScoreFriend: number;

    @Prop()
    canBomb: number;

    @Prop()
    canLightning: number;

    @Prop()
    canBlackhole: number;

    @Prop()
    canLaser: number;

    @Prop()
    canFreeze: number;

    @Prop({default: 0})
    worth: number;

    @Prop(raw([{
        id: {type: Number, default: 0},
        weight: {type: Number, default: 0}
    }]))
    boxes: Record<string, any>;

    @Prop({default: 0})
    showNameTime: number;

    @Prop({default: 0})
    nameY: number;

    @Prop()
    groupId: number;

    @Prop({default: 0})
    casinoScore: number;

    @Prop({default: 0})
    power: number;
}

export const AircraftMonsterPlaneConfigSchema = SchemaFactory.createForClass(AircraftMonsterPlaneConfig);

export const AircraftMonsterPlaneConfigModel = {
    name: AircraftMonsterPlaneConfig.name,
    schema: AircraftMonsterPlaneConfigSchema,
    collection: 'aircraftMonsterPlaneConfig'
};
