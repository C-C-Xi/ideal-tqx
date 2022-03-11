import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class RankAdvacnedConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    upperLimit: number;

    @Prop()
    taskId: number;

    @Prop()
    taskName: string;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    rewardItems: Record<string, any>;
}

export const RankAdvacnedConfigSchema = SchemaFactory.createForClass(RankAdvacnedConfig);

export const RankAdvacnedConfigModel = {
    name: RankAdvacnedConfig.name,
    schema: RankAdvacnedConfigSchema,
    collection: 'rankAdvacnedConfig'
};
