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
export class ConfigSlotsRoom103 extends Document {

    //全局表
    @Prop(raw([{
        Id: ModelDataInt32,
        Key: ModelDataString,
        Data: ModelDataString,
        Desc: ModelDataString,
    }]))
    Room103_Common: Record<string, any>;

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
    Room103_Roulette: Record<string, any>;

    //轮盘元素表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        Odds2: ModelDataInt32,
        Odds3: ModelDataInt32,
        Odds4: ModelDataInt32,
        Odds5: ModelDataInt32
    }]))
    Room103_RouletteElement: Record<string, any>;

    //金币元素权重表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        RouletteType: ModelDataInt32,
        Name: ModelDataString,
        Value: ModelDataInt32,
        Weight: ModelDataInt32,
    }]))
    Room103_RouletteElementGold: Record<string, any>;

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
    Room103_Jackpot: Record<string, any>;

    //免费游戏表
    @Prop(raw([{
        Id: ModelDataInt32,
        WheelNum: ModelDataInt32,
        GameNum: ModelDataInt32,
        Roulette: ModelDataInt32,
    }]))
    Room103_FreeGame: Record<string, any>;

    //特殊轮盘表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        Multiple: ModelDataInt32,
        Quality: ModelDataInt32,
    }]))
    Room103_SpecialTurntable: Record<string, any>;

    //幸运金币解锁表
    @Prop(raw([{
        Id: ModelDataInt32,
        Level: ModelDataInt32,
        ReqStake: ModelDataInt32
    }]))
    Room103_LuckyCoinsUnlock: Record<string, any>;

    //幸运金币表
    @Prop(raw([{
        Id: ModelDataInt32,
        Probability: ModelDataInt32,
        MiniWinWeight: ModelDataInt32,
        MinorWinWeight: ModelDataInt32,
        MajorWinWeight: ModelDataInt32,
        MaxiWinWeight: ModelDataInt32,
        GrandWinWeight: ModelDataInt32,
    }]))
    Room103_LuckyCoinsFlop: Record<string, any>;
}

export const ConfigSlotsRoom103Schema = SchemaFactory.createForClass(ConfigSlotsRoom103);

export const ConfigSlotsRoom103Model = {
    name: ConfigSlotsRoom103.name,
    schema: ConfigSlotsRoom103Schema,
    collection: 'ConfigSlots_Room103'
};
