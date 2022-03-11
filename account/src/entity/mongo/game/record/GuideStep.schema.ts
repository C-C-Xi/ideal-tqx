import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GuideStep extends Document {
    @Prop()
    stepIndex: object;

    @Prop({type:SchemaTypes.Long})
    createTime;
}

export const GuideStepSchema = SchemaFactory.createForClass(GuideStep);

export const GuideStepModel = {
    name: GuideStep.name,
    schema: GuideStepSchema,
    collection: 'RECORD_GuideStep'
};
