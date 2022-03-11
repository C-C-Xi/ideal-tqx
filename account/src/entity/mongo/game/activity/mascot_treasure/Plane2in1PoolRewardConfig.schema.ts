import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖品配置
@Schema()
export class Plane2in1PoolRewardConfig extends Document {
    @Prop()
    id: number;



    @Prop()
    weight: number;

    @Prop()
    add2Pool: number;

    @Prop(raw({
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }))
    rewards: Record<string, any>;
}

export const Plane2in1PoolRewardConfigSchema = SchemaFactory.createForClass(Plane2in1PoolRewardConfig);

export const Plane2in1PoolRewardConfigModel = {
    name: Plane2in1PoolRewardConfig.name,
    schema: Plane2in1PoolRewardConfigSchema,
    collection: 'aircraft2in1PoolRewardConfig'
};
