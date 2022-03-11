import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

const ModelDataInt32 = {type: Number, default: 0};
const ModelDataInt64 = {type: SchemaTypes.Long, default: 0};
const ModelDataString = {type: String, default: ''};

@Schema()
export class ConfigSlotsRoom102 extends Document {

    //全局表
    @Prop(raw([{
        Id: ModelDataInt32,
        Key: ModelDataString,
        Data: ModelDataString,
        Desc: ModelDataString,
    }]))
    Room102_Common: Record<string, any>;

    //轮盘表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: {type: Number, default: 1},
        RouletteGroup:ModelDataInt32,
        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room102_Roulette: Record<string, any>;


    //轮盘元素表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        Odds2: ModelDataInt32,
        Odds3: ModelDataInt32,
        Odds4: ModelDataInt32,
        Odds5: ModelDataInt32,
        Parameter: ModelDataString,
    }]))
    Room102_RouletteElement: Record<string, any>;

    //连线表
    @Prop(raw([{
        Id: ModelDataInt32,
        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room102_Lines: Record<string, any>;

    //奖池表
    @Prop(raw([{
        Id: ModelDataInt32,
        MajorJackpot: ModelDataInt64,
        GrandJackpot: ModelDataInt64,
        MajorJackpotAdd: ModelDataString,
        GrandJackpotAdd: ModelDataString,
    }]))
    Room102_Jackpot: Record<string, any>;

    //免费游戏解锁表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        ReqStake: ModelDataInt32,
    }]))
    Room102_FreePlayUnlock: Record<string, any>;
}

export const ConfigSlotsRoom102Schema = SchemaFactory.createForClass(ConfigSlotsRoom102);

export const ConfigSlotsRoom102Model = {
    name: ConfigSlotsRoom102.name,
    schema: ConfigSlotsRoom102Schema,
    collection: 'ConfigSlots_Room102'
};
