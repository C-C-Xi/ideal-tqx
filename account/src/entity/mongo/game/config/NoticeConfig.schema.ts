import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class NoticeConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    desc: string;


}

export const NoticeConfigSchema = SchemaFactory.createForClass(NoticeConfig);

export const NoticeConfigModel = {
    name: NoticeConfig.name,
    schema: NoticeConfigSchema,
    collection: 'noticeConfig'
};
