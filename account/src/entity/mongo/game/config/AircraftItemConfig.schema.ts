import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

//物品表
@Schema()
export class AircraftItemConfig extends Document {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    desc: string;

    @Prop()
    type: number;

    @Prop()
    icon: string;

    @Prop()
    iconBg: string;

    @Prop()
    max: number;

    @Prop()
    cd: number;

    @Prop()
    buffId: number;

    @Prop()
    buffTarget: number;

    @Prop()
    buffId2: number;

    @Prop()
    buffTarget2: number;
}

export const AircraftItemConfigSchema = SchemaFactory.createForClass(AircraftItemConfig);

export const AircraftItemConfigModel = {
    name: AircraftItemConfig.name,
    schema: AircraftItemConfigSchema,
    collection: 'aircraftItemConfig'
};
