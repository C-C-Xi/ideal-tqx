import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class GatherPlayerSpinSpeedData extends Document {

    @Prop()
    PlayType: number;

    @Prop()
    StageType: number;

    @Prop()
    AppType: number;

    @Prop({default: 0})
    newUser: number;

    @Prop({default: 0})
    ActualGetGold: number;

    @Prop({default: 0})
    CostNum: number;

    @Prop({default: 0})
    WinRewardPool: number;

    @Prop({default: 0})
    TotalWinGold: number;

    @Prop({default: 0})
    TotalLoseGold: number;

    @Prop({default: 0})
    RedPack: number;

    @Prop({default: 0})
    TaskRedPack: number;

    @Prop({type: SchemaTypes.Long})
    BeginTime;

    @Prop({type: SchemaTypes.Long})
    EndTime;

    @Prop({type: SchemaTypes.Long})
    DateTime;
}

export const GatherPlayerSpinSpeedDataSchema = SchemaFactory.createForClass(GatherPlayerSpinSpeedData);

export const GatherPlayerSpinSpeedDataModel = {
    name: GatherPlayerSpinSpeedData.name,
    schema: GatherPlayerSpinSpeedDataSchema,
    collection: 'US_GatherPlayerSpinSpeedData'
};
