import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ComRips extends Document {
    @Prop()
    ip: string;

    @Prop({default: ''})
    address: string;

    @Prop({default: ''})
    remark: string;

    @Prop({default: 0})
    status: number;

    @Prop({type: SchemaTypes.Long})
    updateTime;
}

export const ComRipsSchema = SchemaFactory.createForClass(ComRips);

if (process.env.PLATFORM_TYPE == 'ldzj') {
    //定义索引
    ComRipsSchema.index({updateTime: -1}, {background: true, name: 'ComR_ips_updateTime'});
    ComRipsSchema.index({ip: 'hashed'}, {background: true, unique: true, name: 'ComR_ips_ip'});
}

export const ComRipsModel = {
    name: ComRips.name,
    schema: ComRipsSchema,
    collection: 'ComR_ips'
};
