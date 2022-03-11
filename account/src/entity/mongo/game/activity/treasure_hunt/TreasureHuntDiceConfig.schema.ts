import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子点数配置
@Schema()
export class TreasureHuntDiceConfig extends Document {
    @Prop()
    configId: number;

    @Prop()
    diceId: number;

    @Prop()
    groupId: number;

    @Prop()
    id: number;

    @Prop()
    forbidden: string;

    @Prop()
    weight: number;
}

export const TreasureHuntDiceConfigSchema = SchemaFactory.createForClass(TreasureHuntDiceConfig);

export const TreasureHuntDiceConfigModel = {
    name: TreasureHuntDiceConfig.name,
    schema: TreasureHuntDiceConfigSchema,
    collection: 'treasureHuntDiceConfig'
};
