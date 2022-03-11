import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子种类配置
@Schema()
export class ToTwoInOnePool extends Document {
    @Prop()
    twoInOnePoolInfo:object;
}

export const ToTwoInOnePoolSchema = SchemaFactory.createForClass(ToTwoInOnePool);

export const ToTwoInOnePoolModel = {
    name: ToTwoInOnePool.name,
    schema: ToTwoInOnePoolSchema,
    collection: 'TO_TwoInOnePool'
};
