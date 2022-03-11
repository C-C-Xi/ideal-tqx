import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsPlayerInitialize extends Document {
    @Prop({default: 0})
    id: number;

    @Prop({default: 0})
    playType: number;

    @Prop({default: 0})
    HeadIcon: number;

    @Prop({default: 0})
    InitTurnGoldTimes: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    InitGold;

    @Prop({default: 0})
    gold: number;

    @Prop({default: 0})
    vipLv: number;

    @Prop({default: 0})
    InItSuperTurnTimes: number;

    //
    // @Prop({default: 0})
    // diamond: number;
    //
    // @Prop({default: 0})
    // energyCrystal: number;
    //
    // @Prop({default: 0})
    // bulletRate: number;
    //
    // @Prop({default: 0})
    // frenzy: number;
    //
    // @Prop({default: 0})
    // aiming: number;
    //
    // @Prop({default: 0})
    // gelivation: number;
    //
    // @Prop({default: 0})
    // summon: number;
    //
    // @Prop({default: 0})
    // dropBulletLv: number;
    //
    // @Prop({default: 0})
    // actionPower: number;
    //
    // @Prop({default: 0})
    // benefitsVipLv: number;
    //
    // @Prop({default: 0})
    // FreeTime: number;
    //
    // @Prop({default: 0})
    // MinMoney: number;
    //
    // @Prop({default: 0})
    // TestAB: number;
    //
    // @Prop({default: 0})
    // TestABStartTime: number;
    //
    // @Prop({default: 0})
    // TestABEndTime: number;
    //
    // @Prop({default: 0})
    // PlaneLeveVerify: number;
    //
    // @Prop({default: 0})
    // ruinsGoldRatio: number;
    //
    // @Prop({default: 0})
    // ruinsRedRatio: number;
}

export const ConfigSlotsPlayerInitializeSchema = SchemaFactory.createForClass(ConfigSlotsPlayerInitialize);

export const ConfigSlotsPlayerInitializeModel = {
    name: ConfigSlotsPlayerInitialize.name,
    schema: ConfigSlotsPlayerInitializeSchema,
    collection: 'playerInitializeConfig'
};
