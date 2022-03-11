import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子获得配置
@Schema()
export class DiceGetConfig extends Document {
    @Prop()
    configId: number;

    @Prop()
    groupId: number;

    @Prop()
    diceNum: number;

    @Prop({type: SchemaTypes.Long})
    winNum;
}

export const DiceGetConfigSchema = SchemaFactory.createForClass(DiceGetConfig);

export const DiceGetConfigModel = {
    name: DiceGetConfig.name,
    schema: DiceGetConfigSchema,
    collection: 'diceGetConfig'
};
