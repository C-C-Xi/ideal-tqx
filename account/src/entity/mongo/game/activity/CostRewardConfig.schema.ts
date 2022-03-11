import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;


@Schema()
export class CostRewardConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    playType: number;

    @Prop()
    costType: number;

    @Prop({type:SchemaTypes.Long})
    costNum;

    @Prop()
    rewardType: number;

    @Prop()
    rewardRate: string;

    @Prop()
    showNum: string;
}

export const CostRewardConfigSchema = SchemaFactory.createForClass(CostRewardConfig);

export const CostRewardConfigModel = {
    name: CostRewardConfig.name,
    schema: CostRewardConfigSchema,
    collection: 'costRewardConfig'
};
