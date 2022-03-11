import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class RankConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    upperLimit: number;

    @Prop()
    taskId: number;

    @Prop()
    taskName: string;

    @Prop({type:SchemaTypes.Long})
    targetNum;

    @Prop({type:SchemaTypes.Long})
    startTime;

    @Prop({type:SchemaTypes.Long})
    endTime;
}

export const RankConfigSchema = SchemaFactory.createForClass(RankConfig);

export const RankConfigModel = {
    name: RankConfig.name,
    schema: RankConfigSchema,
    collection: 'rankConfig'
};
