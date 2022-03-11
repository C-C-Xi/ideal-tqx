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
export class ConfigSlotsRoom101 extends Document {

    //全局表
    @Prop(raw([{
        Id: ModelDataInt32,
        Key: ModelDataString,
        Data: ModelDataString,
        Desc: ModelDataString,
    }]))
    Room101_Common: Record<string, any>;

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
    Room101_Roulette: Record<string, any>;

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
    Room101_RouletteElement: Record<string, any>;

    //连线表
    @Prop(raw([{
        Id: ModelDataInt32,
        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room101_Lines: Record<string, any>;

    //奖池表
    @Prop(raw([{
        Id: ModelDataInt32,
        MiniJackpot: ModelDataInt64,
        MinorJackpot: ModelDataInt64,
        MajorJackpot: ModelDataInt64,
        MaxiJackpot: ModelDataInt64,
        GrandJackpot: ModelDataInt64,
        MiniJackpotAdd: ModelDataString,
        MinorJackpotAdd: ModelDataString,
        MajorJackpotAdd: ModelDataString,
        MaxiJackpotAdd: ModelDataString,
        GrandJackpotAdd: ModelDataString,
    }]))
    Room101_Jackpot: Record<string, any>;

    //免费游戏解锁表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        ReqStake: ModelDataInt32,
    }]))
    Room101_FreePlayUnlock: Record<string, any>;

    //彩金游戏表
    @Prop(raw([{
        Id: ModelDataInt32,
        Reward1: ModelDataInt32,
        Reward2: ModelDataInt32,
        Reward3: ModelDataInt32,
        To2: ModelDataInt32,
        To3: ModelDataInt32,
        To4: ModelDataInt32,
        Weight4_1: ModelDataInt32,
        Weight4_2: ModelDataInt32,
        Weight4_3: ModelDataInt32,
        Weight4_4: ModelDataInt32,
        Weight4_5: ModelDataInt32,
    }]))
    Room101_Bonus: Record<string, any>;
}

export const ConfigSlotsRoom101Schema = SchemaFactory.createForClass(ConfigSlotsRoom101);

export const ConfigSlotsRoom101Model = {
    name: ConfigSlotsRoom101.name,
    schema: ConfigSlotsRoom101Schema,
    collection: 'ConfigSlots_Room101'
};
