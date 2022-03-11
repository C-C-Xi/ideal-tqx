import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class MonsterConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    monsterName: string;

    @Prop()
    monsterId: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    monsterHp;

    @Prop()
    monsterPool: number;

    @Prop()
    monsterReward: number;

    @Prop()
    stageType: number;

    @Prop()
    stageId: number;

    @Prop()
    count: number;

    @Prop()
    rate: string;

    @Prop()
    order: number;

    @Prop({type: SchemaTypes.Double, default: 0.00})
    conversionRate;

    @Prop({type: SchemaTypes.Long, default: 0})
    boxValue;

    @Prop(raw([{
        id: {type:Number},
        boxName: {type:String},
        weight: {type:Number},
    }]))
    boxs: Record<string, any>;
}

export const MonsterConfigSchema = SchemaFactory.createForClass(MonsterConfig);

export const MonsterConfigModel = {
    name: MonsterConfig.name,
    schema: MonsterConfigSchema,
    collection: 'monsterConfig'
};
