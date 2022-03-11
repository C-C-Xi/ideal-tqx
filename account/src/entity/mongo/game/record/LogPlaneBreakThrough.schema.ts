import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlaneBreakThrough extends Document {
    @Prop()
    id: number;

    @Prop()
    ConfigLevelId : number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    Reward: Record<string, any>;


    @Prop({type:SchemaTypes.Long})
    CostTimes ;

    @Prop({type:SchemaTypes.Long})
    Progress ;

    @Prop()
    Result : number;
}

export const LogPlaneBreakThroughSchema = SchemaFactory.createForClass(LogPlaneBreakThrough);

export const PlaneBreakThroughModel = {
    name: LogPlaneBreakThrough.name,
    schema: LogPlaneBreakThroughSchema,
    collection: 'LOG_PlaneBreakThrough'
};
