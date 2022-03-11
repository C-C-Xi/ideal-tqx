import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class SourceClassifySpeed extends Document {
    @Prop()
    AppType: number;

    @Prop()
    currencyType: string;
    
    @Prop()
    changeNumber: object;

    @Prop()
    dateTime: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const SourceClassifySpeedSchema = SchemaFactory.createForClass(SourceClassifySpeed);

export const SourceClassifySpeedModel = {
    name: SourceClassifySpeed.name,
    schema: SourceClassifySpeedSchema,
    collection: 'SUPERVISE_SourceClassifySpeed'
};
