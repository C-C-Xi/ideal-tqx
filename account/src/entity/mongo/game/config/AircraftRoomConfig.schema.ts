import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftRoomConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    gun: string;

    @Prop()
    desc: string;

    @Prop()
    map: string;

    @Prop()
    vipLimit: number;

    @Prop({type: SchemaTypes.Long})
    goldLimit;

    @Prop()
    gunPowerLimit: number;

    @Prop()
    poolGold: number;

    @Prop()
    betSysRate: number;

    @Prop()
    betRankRate: number;

    @Prop()
    betPoolRate: number;

    @Prop()
    betCovToRedpack: number;

    @Prop()
    earnSysRate: number;

    @Prop()
    earnRankRate: number;

    @Prop()
    earnPoolRate: number;

    @Prop({type: SchemaTypes.Long})
    superBombNeedHit;

    @Prop({type: SchemaTypes.Long})
    superBombPoolRate;

    @Prop(raw([{
        rate: {type: Number},
        weight: {type: Number},
    }]))
    superBombReward: Record<string, any>;

    @Prop()
    breakThroughLimit: number;
}

export const AircraftRoomConfigSchema = SchemaFactory.createForClass(AircraftRoomConfig);

export const AircraftRoomConfigModel = {
    name: AircraftRoomConfig.name,
    schema: AircraftRoomConfigSchema,
    collection: 'aircraftRoomConfig'
};
