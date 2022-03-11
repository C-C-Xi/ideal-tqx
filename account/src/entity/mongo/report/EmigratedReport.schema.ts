import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class EmigratedReport extends Document {
    @Prop()
    AppType: number;

    @Prop()
    todayLevelCount: object;

    @Prop()
    yesterdayLevelCount: object;

    @Prop()
    emiRoomUserCount: number;

    @Prop()
    redPackRoomUserCount: number;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const EmigratedReportSchema = SchemaFactory.createForClass(EmigratedReport);


export const EmigratedReportModel = {
    name: EmigratedReport.name,
    schema: EmigratedReportSchema,
    collection: 'RP_EmigratedReport'
};
