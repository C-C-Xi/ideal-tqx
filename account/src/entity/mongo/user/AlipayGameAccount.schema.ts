import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AlipayGameAccount extends Document {
    @Prop()
    incomeAccount: string;

    @Prop()
    incomeUserName: string;

    @Prop()
    uid: number;

    @Prop({default:0})
    lock: number;


    @Prop({default:0})
    notCheckName: number;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const AlipayGameAccountSchema = SchemaFactory.createForClass(AlipayGameAccount);

//定义索引
AlipayGameAccountSchema.index({incomeAccount: -1}, {background: true, name: 'alipayGame2Account_incomeAccount'});

export const AlipayGameAccountModel = {
    name: AlipayGameAccount.name,
    schema: AlipayGameAccountSchema,
    collection: 'alipayGame2Account'
};
