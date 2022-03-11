import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSpeedCasinaScoreData extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    AppType: number;

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

    @Prop({default: 0})
    ext1: number;

    @Prop({default: 0})
    ext2: number;

    @Prop({default: 0})
    ext3: number;

    @Prop({default: 0})
    ext4: number;

    @Prop({default: 0})
    ext5: number;

    @Prop({default: 0})
    ext6: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const LogSpeedCasinaScoreDataDataSchema = SchemaFactory.createForClass(LogSpeedCasinaScoreData);


export const LogSpeedCasinaScoreDataModel = {
    name: LogSpeedCasinaScoreData.name,
    schema: LogSpeedCasinaScoreDataDataSchema,
    collection: 'SD_LogSpeedCasinaScoreData'
};
