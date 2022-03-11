import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AdvertReport extends Document {
    @Prop()
    qid: number;

    @Prop()
    AppType:number;

    @Prop()
    viewTimes:number;

    @Prop()
    viewUser:number;

    @Prop()
    newUserFlags:number;

    @Prop()
    scenceData: object;

    @Prop({default:0})
    ecpm: number;

    @Prop({default:0})
    allEarnings: number;

    @Prop()
    dateTime: number;

    @Prop({type:SchemaTypes.Long})
    time;
}

export const AdvertReportSchema = SchemaFactory.createForClass(AdvertReport);

//定义索引
AdvertReportSchema.index({dateTime: -1}, {background: true, name: 'RP_AdvertReport_dateTime'});
AdvertReportSchema.index({time: -1}, {background: true, name: 'RP_AdvertReport_time'});

export const AdvertReportModel = {
    name: AdvertReport.name,
    schema: AdvertReportSchema,
    collection: 'RP_AdvertReport'
};
