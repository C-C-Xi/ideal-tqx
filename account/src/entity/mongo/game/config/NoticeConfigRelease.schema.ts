import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class NoticeConfigRelease extends Document {
    @Prop()
    id: number;

    @Prop()
    desc: string;


}

export const NoticeConfigReleaseSchema = SchemaFactory.createForClass(NoticeConfigRelease);

export const NoticeConfigReleaseModel = {
    name: NoticeConfigRelease.name,
    schema: NoticeConfigReleaseSchema,
    collection: 'noticeConfigRelease'
};
