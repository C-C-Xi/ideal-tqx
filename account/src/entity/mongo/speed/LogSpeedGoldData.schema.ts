import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSpeedGoldData extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    Qid: number;

    @Prop()
    type: number;

    @Prop()
    extType1: number;

    @Prop()
    extType2: number;

    @Prop()
    changeNumber: number;

    @Prop()
    ext1: number;

    @Prop()
    ext2: number;

    @Prop()
    ext3: number;

    @Prop()
    ext4: number;

    @Prop()
    ext5: number;

    @Prop()
    ext6: number;

    @Prop()
    pureEarn: number;

    @Prop()
    pureCost: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const LogSpeedGoldDataDataSchema = SchemaFactory.createForClass(LogSpeedGoldData);

export const LogSpeedGoldDataModel = {
    name: LogSpeedGoldData.name,
    schema: LogSpeedGoldDataDataSchema,
    collection: 'SD_LogSpeedGoldData'
};
