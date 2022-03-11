import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class StageConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    stageType: number;

    @Prop()
    stageId: number;

    @Prop()
    stageParam: number;

    @Prop()
    betMin: number;

    @Prop()
    betMax: number;

    @Prop()
    minWeapon: number;

    @Prop()
    broadcast: number;

    @Prop()
    costCovRedpackRate: number;

    @Prop()
    expectGetCovRedpackRate: number;

    @Prop()
    rollbackOrder: number;

    @Prop()
    gunPowerLimit: number;
}

export const StageConfigSchema = SchemaFactory.createForClass(StageConfig);

export const StageConfigModel = {
    name: StageConfig.name,
    schema: StageConfigSchema,
    collection: 'stageConfig'
};
