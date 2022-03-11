import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子种类配置
@Schema()
export class TreasureHunt extends Document {
    @Prop()
    configId: number;

    @Prop()
    groupId: number;

    @Prop()
    diceName: string;

    @Prop()
    worth: number;

    @Prop(raw([{
        ratio: {type: Number},
        weight: {type: Number},
    }]))
    ratioItems: Record<string, any>;

    @Prop()
    costItem: object;
}

export const TreasureHuntSchema = SchemaFactory.createForClass(TreasureHunt);

export const TreasureHuntModel = {
    name: TreasureHunt.name,
    schema: TreasureHuntSchema,
    collection: 'treasureHunt'
};
