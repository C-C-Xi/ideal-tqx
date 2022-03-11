import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class MaintainConfig extends Document {
    @Prop()
    id: number;

    @Prop({default: 0})
    status: number;

    @Prop({default: 0})
    bateStatus: number;

    @Prop({default: ''})
    content: string;

    @Prop({default: ''})
    wxpayAppId:string;

    @Prop({default: ''})
    qq:string;

    @Prop({default: 0})
    payStatus: number;

    @Prop({default: 0})
    exchangeStatus: number;
}

export const MaintainConfigSchema = SchemaFactory.createForClass(MaintainConfig);

export const MaintainConfigModel = {
    name: MaintainConfig.name,
    schema: MaintainConfigSchema,
    collection: 'maintainConfig'
};
