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
export class ConfigSlotsRoom105 extends Document {

    //全局表
    @Prop(raw([{
        Id: ModelDataInt32,
        Key: ModelDataString,
        Data: ModelDataString,
        Desc: ModelDataString,
    }]))
    Room105_Common: Record<string, any>;

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
    Room105_Roulette: Record<string, any>;

    //轮盘元素表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        Odds3: ModelDataInt32,
        Odds4: ModelDataInt32,
        Odds5: ModelDataInt32,
        FuxingWeight: ModelDataInt32,
    }]))
    Room105_RouletteElement: Record<string, any>;

    //线数表
    @Prop(raw([{
        Id: ModelDataInt32,
        Roulette1: ModelDataInt32,
        Roulette2: ModelDataInt32,
        Roulette3: ModelDataInt32,
        Roulette4: ModelDataInt32,
        Roulette5: ModelDataInt32,
    }]))
    Room105_RouletteLines: Record<string, any>;

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
    Room105_Jackpot: Record<string, any>;

}

export const ConfigSlotsRoom105Schema = SchemaFactory.createForClass(ConfigSlotsRoom105);

export const ConfigSlotsRoom105Model = {
    name: ConfigSlotsRoom105.name,
    schema: ConfigSlotsRoom105Schema,
    collection: 'ConfigSlots_Room105'
};
