import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class SourceClassifyData extends Document {
    @Prop()
    AppType: number;

    @Prop()
    currencyType: string;

    @Prop()
    uid: number;

    @Prop()
    changeNumber: object;

    @Prop()
    dateTime: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const SourceClassifyDataSchema = SchemaFactory.createForClass(SourceClassifyData);

export const SourceClassifyDataModel = {
    name: SourceClassifyData.name,
    schema: SourceClassifyDataSchema,
    collection: 'SUPERVISE_SourceClassifyData'
};
