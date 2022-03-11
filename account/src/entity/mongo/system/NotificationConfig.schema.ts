import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class NotificationConfig extends Document {
    @Prop()
    id: number;

    @Prop({default: ''})
    title: string;

    @Prop({default: ''})
    message: string;

    @Prop({default: ''})
    img: string;

    @Prop({default: 0})
    status: number;

    @Prop()
    type: string;

    @Prop({type: SchemaTypes.Long})
    activityTS;
}

export const NotificationConfigSchema = SchemaFactory.createForClass(NotificationConfig);

export const NotificationConfigSchemaModel = {
    name: NotificationConfig.name,
    schema: NotificationConfigSchema,
    collection: 'notificationConfig'
};
