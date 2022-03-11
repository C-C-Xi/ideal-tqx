import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ComRalipayAccount extends Document {
    @Prop()
    incomeAccount: string;

    @Prop()
    incomeUserName: string;

    @Prop({default: 0})
    status: number;

    @Prop({type: SchemaTypes.Long})
    updateTime;


    @Prop({default: ''})
    remark: string;
}

export const ComRalipayAccountSchema = SchemaFactory.createForClass(ComRalipayAccount);

if (process.env.PLATFORM_TYPE == 'ldzj') {
    //定义索引
    ComRalipayAccountSchema.index({updateTime: -1}, {background: true, name: 'ComR_alipayAccount_updateTime'});
    ComRalipayAccountSchema.index({incomeAccount: 'hashed'}, {
        background: true,
        unique: true,
        name: 'ComR_alipayAccount_incomeAccount'
    });
    ComRalipayAccountSchema.index({incomeUserName: 'hashed'}, {
        background: true,
        name: 'ComR_alipayAccount_incomeUserName'
    });
}

export const ComRalipayAccountModel = {
    name: ComRalipayAccount.name,
    schema: ComRalipayAccountSchema,
    collection: 'ComR_alipayAccount'
};
