import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Raw} from "typeorm";

@Schema()
export class ChannelsPeriods extends Document {
    @Prop()
    id: number;

    @Prop()
    secretKey: string;

    @Prop()
    planTypeRecharge: string;

    @Prop()
    planTypeSymbol: string;

    @Prop(raw([{
        id: {type:Number},
        name: {type:String},
        step: {type:Number},
        money: {type:Number},
        newUser: {type:Number},
    }]))
    rechargePlanData: Record<string, any>;

    @Prop(raw([{
        id: {type:Number},
        name: {type:String},
        step: {type:Number},
        money: {type:Number},
        newUser: {type:Number},
        expectRecharge: {type: Number, default: 0},
        expectStep: {type: Number, default: 0},
    }]))
    symbolPlanData: Record<string, any>;

    @Prop()
    startTime: number;

    @Prop()
    endTime: number;
}

export const ChannelsPeriodsSchema = SchemaFactory.createForClass(ChannelsPeriods);

//定义索引 @todo
ChannelsPeriodsSchema.index({id: 1}, {background: true, unique: true, name: "ChannelsPeriods_id"});

export const ChannelsPeriodsModel = {
    name: ChannelsPeriods.name,
    schema: ChannelsPeriodsSchema,
    collection: 'channelsPeriods'
};
