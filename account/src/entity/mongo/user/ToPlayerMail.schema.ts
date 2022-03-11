import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ToPlayerMail extends Document {
    @Prop()
    uid: number;


}

export const ToPlayerMailSchema = SchemaFactory.createForClass(ToPlayerMail);

//定义索引
ToPlayerMailSchema.index({uid: 1}, {background: true, name: 'TO_PlayerMail_uid'});


export const ToPlayerMailModel = {
    name: ToPlayerMail.name,
    schema: ToPlayerMailSchema,
    collection: 'TO_PlayerMail'
};
