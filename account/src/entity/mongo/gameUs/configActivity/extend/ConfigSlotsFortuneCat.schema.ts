import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ConfigSlotsFortuneCat extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;

    @Prop({type: SchemaTypes.Long, default: 0})
    CatStoMax;

    @Prop({type: SchemaTypes.Long, default: 0})
    CatInitialBasic;

    @Prop({type: SchemaTypes.Long, default: 0})
    BasicMax;

    @Prop({type: SchemaTypes.Long, default: 0})
    InitialSto;

    @Prop({default: 0})
    CatRatio: number;

    @Prop({default: 0})
    CatBagLvUp: number;
}

export const ConfigSlotsFortuneCatSchema = SchemaFactory.createForClass(ConfigSlotsFortuneCat);

export const ConfigSlotsFortuneCatModel = {
    name: ConfigSlotsFortuneCat.name,
    schema: ConfigSlotsFortuneCatSchema,
    collection: 'ConfigSlots_FortuneCat'
};
