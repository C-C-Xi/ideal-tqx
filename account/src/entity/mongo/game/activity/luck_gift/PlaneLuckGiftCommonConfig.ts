import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子种类配置
@Schema()
export class PlaneLuckGiftCommonConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    desc: string;

    @Prop({type: SchemaTypes.Long})
    value;

}

export const PlaneLuckGiftCommonConfigSchema = SchemaFactory.createForClass(PlaneLuckGiftCommonConfig);

export const PlaneLuckGiftCommonConfigModel = {
    name: PlaneLuckGiftCommonConfig.name,
    schema: PlaneLuckGiftCommonConfigSchema,
    collection: 'planeLuckgiftCommonConfig'
};
