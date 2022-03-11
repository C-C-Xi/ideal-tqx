import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class UserReportData extends Document {
    @Prop()
    AppType: number;

    @Prop({default: 0})
    registerUser: number;

    @Prop({default: 0})
    rechargeMoney: number;

    @Prop({default: 0})
    exchangeMoney: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const UserReportDataSchema = SchemaFactory.createForClass(UserReportData);

export const UserReportDataModel = {
    name: UserReportData.name,
    schema: UserReportDataSchema,
    collection: 'RP_UserReportData'
};
