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
export class ConfigSlotsRoom104 extends Document {

    //全局表
    @Prop(raw([{
        Id: ModelDataInt32,
        Key: ModelDataString,
        Data: ModelDataString,
        Desc: ModelDataString,
    }]))
    Room104_Common: Record<string, any>;

    //轮盘表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        RouletteGroup:ModelDataInt32,
        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room104_Roulette: Record<string, any>;

    //轮盘元素表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        Odds2: ModelDataInt32,
        Odds3: ModelDataInt32,
        Odds4: ModelDataInt32,
        Odds5: ModelDataInt32,
        FuxingWeight: ModelDataInt32,
    }]))
    Room104_RouletteElement: Record<string, any>;

    //线数表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,

        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room104_RouletteLines: Record<string, any>;

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
    Room104_Jackpot: Record<string, any>;

    //奖池游戏解锁表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        ReqStake: ModelDataInt32,
    }]))
    Room104_JackpotGameUnlock: Record<string, any>;

    //奖池游戏表
    @Prop(raw([{
        Id: ModelDataInt32,
        Probability: ModelDataInt32,
        MiniWinWeight: ModelDataInt32,
        MinorWinWeight: ModelDataInt32,
        MajorWinWeight: ModelDataInt32,
        MaxiWinWeight: ModelDataInt32,
        GrandWinWeight: ModelDataInt32,
    }]))
    Room104_JackpotGame: Record<string, any>;

    //免费游戏表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        GameNum: ModelDataInt32,
        Weight: ModelDataInt32,
        Roulette: ModelDataInt32,
    }]))
    Room104_FreeGame: Record<string, any>;

    //福寿免费游戏表
    @Prop(raw([{
        Id: ModelDataInt32,
        Array: ModelDataString,
        Weight: ModelDataInt32,
        Row: ModelDataInt32,
    }]))
    Room104_FreeGamePeach: Record<string, any>;
}

export const ConfigSlotsRoom104Schema = SchemaFactory.createForClass(ConfigSlotsRoom104);

export const ConfigSlotsRoom104Model = {
    name: ConfigSlotsRoom104.name,
    schema: ConfigSlotsRoom104Schema,
    collection: 'ConfigSlots_Room104'
};
