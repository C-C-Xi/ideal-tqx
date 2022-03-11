import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftNoviceProtectConfig extends Document {

    @Prop({type: SchemaTypes.Long})
    gold: number;

    @Prop()
    adj: number;

    @Prop()
    playType: number;
}

export const AircraftNoviceProtectConfigSchema = SchemaFactory.createForClass(AircraftNoviceProtectConfig);

export const AircraftNoviceProtectConfigModel = {
    name: AircraftNoviceProtectConfig.name,
    schema: AircraftNoviceProtectConfigSchema,
    collection: 'aircraftNoviceProtectConfig'
};
