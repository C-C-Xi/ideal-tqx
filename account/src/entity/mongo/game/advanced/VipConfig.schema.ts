import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class VipConfig extends Document {
    @Prop()
    configId:number;

    @Prop()
    Id: number;

    @Prop()
    Name: string;

    @Prop()
    Exp: number;

    @Prop({default: ''})
    ResSmall: string;


    @Prop({default: ''})
    ResHead: string;

    @Prop()
    Benefits: number;

    @Prop()
    BenefitsFreeCount: number;

    @Prop()
    SignInRate: number;

    @Prop({default: ''})
    Des: string;

    @Prop()
    RewardPoolUp: number;

    @Prop()
    Reward: object;

    @Prop({default: ''})
    AnnouncementDes: string;

    @Prop()
    IsAutoDrawRedPackPool: number;

    @Prop({type:SchemaTypes.Long})
    PiggyBankMax;

    @Prop({default:0})
    pierce: number;

    @Prop({default:0})
    redbag2vipTimes: number;

    @Prop({default:0})
    redbag2vipNum: number;
}

export const VipConfigSchema = SchemaFactory.createForClass(VipConfig);

export const VipConfigModel = {
    name: VipConfig.name,
    schema: VipConfigSchema,
    collection: 'vipConfig'
};
