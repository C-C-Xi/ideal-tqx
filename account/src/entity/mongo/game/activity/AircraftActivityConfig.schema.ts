import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftActivityConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    Name: string;

    @Prop()
    Describe: string;

    @Prop()
    Type: number;

    @Prop()
    DailyLimit: number;

    //开始结束时间
    @Prop()
    OpenRule: number;

    @Prop({type: SchemaTypes.Long})
    OpenTime;

    @Prop({type: SchemaTypes.Long})
    CloseTime;

    @Prop()
    Activate: boolean;

    @Prop({default: ""})
    Channel: string;

    @Prop()
    ImageUrl: string;

    @Prop()
    PopOrder: number;

    @Prop()
    Button: string;

    @Prop()
    ShowLabels: number;

    @Prop()
    Skip: number;

    @Prop()
    Data: string;

    @Prop()
    DataParam: string;

    @Prop()
    Effect: number;

    @Prop(raw([{type: Number}]))
    ActivityRoom: Record<string, any>;
}

export const AircraftActivityConfigSchema = SchemaFactory.createForClass(AircraftActivityConfig);

export const AircraftActivityConfigModel = {
    name: AircraftActivityConfig.name,
    schema: AircraftActivityConfigSchema,
    collection: 'aircraftActivityConfig'
};
