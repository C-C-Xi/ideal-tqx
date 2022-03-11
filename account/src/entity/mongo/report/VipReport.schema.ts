import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class VipReport extends Document {
    @Prop()
    activeUserVip: object;

    @Prop()
    allUserVip: object;
 
    @Prop({type:SchemaTypes.Long})
    time;
}

export const VipReportSchema = SchemaFactory.createForClass(VipReport);

export const VipReportModel = {
    name: VipReport.name,
    schema: VipReportSchema,
    collection: 'RP_VipReport'
};
