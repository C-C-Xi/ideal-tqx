import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AircraftBulletUpgradeConfig extends Document {

    @Prop()
    lv: number;

    @Prop(raw([{
        itemId: {type: Number},
        type: {type: Number},
        num: {type: SchemaTypes.Long}
    }]))
    rewardItems: Record<string, any>;

    @Prop()
    bulletMaxLimit: number;

    @Prop()
    upgItemId: number;

    @Prop()
    upgType: number;

    @Prop()
    upgNum: number;
}

export const AircraftBulletUpgradeConfigSchema = SchemaFactory.createForClass(AircraftBulletUpgradeConfig);

export const AircraftBulletUpgradeConfigModel = {
    name: AircraftBulletUpgradeConfig.name,
    schema: AircraftBulletUpgradeConfigSchema,
    collection: 'aircraftBulletUpgradeConfig'
};
