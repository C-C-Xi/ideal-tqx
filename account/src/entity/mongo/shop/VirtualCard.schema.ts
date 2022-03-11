import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class VirtualCard extends Document {

    @Prop({default:''})
    cardNo: string;

    @Prop({default:''})
    cardPwd: string;

    @Prop({default:0})
    money: number;

    @Prop({default:0})
    status: number;

    @Prop()
    type: number;

    @Prop({type:SchemaTypes.Long})
    createTime;

    @Prop({type:SchemaTypes.Long,default:0})
    uid;

    @Prop({type:SchemaTypes.Long,default:0})
    useTime;
}

export const VirtualCardSchema = SchemaFactory.createForClass(VirtualCard);

export const VirtualCardModel = {
    name: VirtualCard.name,
    schema: VirtualCardSchema,
    collection: 'virtualCard'
};
