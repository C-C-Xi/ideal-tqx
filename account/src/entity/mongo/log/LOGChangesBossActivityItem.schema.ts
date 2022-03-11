import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LOGChangesBossActivityItem extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LOGChangesBossActivityItemSchema = SchemaFactory.createForClass(LOGChangesBossActivityItem);

export const LOGChangesBossActivityItemModel = {
    name: LOGChangesBossActivityItem.name,
    schema: LOGChangesBossActivityItemSchema,
    collection: 'LOG_ChangesBossActivityItem'
};
