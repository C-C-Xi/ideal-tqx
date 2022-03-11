import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSpeedRedpackData extends Document {
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

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const LogSpeedRedpackDataSchema = SchemaFactory.createForClass(LogSpeedRedpackData);

export const LogSpeedRedpackDataModel = {
    name: LogSpeedRedpackData.name,
    schema: LogSpeedRedpackDataSchema,
    collection: 'SD_LogSpeedRedpackData'
};
