import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//骰子种类配置
@Schema()
export class Plane2in1PoolCommonConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    desc: string;

    @Prop({type: SchemaTypes.Long})
    value;

}

export const Plane2in1PoolCommonConfigSchema = SchemaFactory.createForClass(Plane2in1PoolCommonConfig);

export const Plane2in1PoolCommonConfigModel = {
    name: Plane2in1PoolCommonConfig.name,
    schema: Plane2in1PoolCommonConfigSchema,
    collection: 'aircraft2in1PoolCommonConfig'
};
