import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LtvSpeed extends Document {
    @Prop({default: 0})
    qid: number;

    @Prop({default: 0})
    newUser: number;

    @Prop({default: 0})
    activeUser: number;

    @Prop({default: 0})
    allActiveUser: number;

    @Prop({default: 0})
    rechargeUser: number;

    @Prop({default: 0})
    rechargeMoney: number;

    @Prop()
    newRechargeUser: object;

    @Prop()
    newUserRechargeMoney: object;

    @Prop({default: 0})
    newUserRedPack: number;

    @Prop({type: SchemaTypes.Double})
    newUserExchangeMoney;

    @Prop({default: 0})
    allUsersRedPack: number;

    @Prop({type: SchemaTypes.Double})
    allUsersExchangeMoney;

    @Prop({type: SchemaTypes.Long})
    time;
}

export const LtvSpeedSchema = SchemaFactory.createForClass(LtvSpeed);

export const LtvSpeedModel = {
    name: LtvSpeed.name,
    schema: LtvSpeedSchema,
    collection: 'LtvSpeed'
};
