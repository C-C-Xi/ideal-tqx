import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class AdvertConfig extends Document {

    @Prop()
    Id: number;

    @Prop()
    AdLimit: number;

    @Prop()
    AdInterval : number;

    @Prop(raw([{
        itemType: {type: Number, default: 0},
        itemId: {type: Number, default: 0},
        numUp: {type: Number, default: 0},
        numDown: {type: Number, default: 0},
    }]))
    Reward: Record<string, any>;

}

export const AdvertConfigSchema = SchemaFactory.createForClass(AdvertConfig);

export const AdvertConfigModel = {
    name: AdvertConfig.name,
    schema: AdvertConfigSchema,
    collection: 'advertConfig'
};
