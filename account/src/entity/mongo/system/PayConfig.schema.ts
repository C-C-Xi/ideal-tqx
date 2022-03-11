import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PayConfig extends Document {


    @Prop({default: 0})
    wxPayWeight: number;

    @Prop({default: 0})
    aliPayWeight: number;

    @Prop({default: 0})
    huiChaoPayWeight: number;

    @Prop({default: 0})
    adaPayWeight: number;

    @Prop({default: 0})
    hfbPayWeight: number;

    @Prop({default: 0})
    hnxcAliPayWeight: number;

    @Prop({default: 0})
    mihuaAliPayWeight: number;

}

export const PayConfigSchema = SchemaFactory.createForClass(PayConfig);

export const PayConfigModel = {
    name: PayConfig.name,
    schema: PayConfigSchema,
    collection: 'payConfig'
};
