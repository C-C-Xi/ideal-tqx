import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//奖品配置
@Schema()
export class BonusConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    order: number;

    @Prop()
    rewardPoolRate: number;

    @Prop({type: SchemaTypes.Long})
    periodTotalDepot;

    @Prop()
    periodPersonLimit: number;

    @Prop()
    isBroadcast: boolean;

    @Prop()
    quality: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
    }]))
    getItems: Record<string, any>;
}

export const BonusConfigSchema = SchemaFactory.createForClass(BonusConfig);

export const BonusConfigModel = {
    name: BonusConfig.name,
    schema: BonusConfigSchema,
    collection: 'bonusConfig'
};
