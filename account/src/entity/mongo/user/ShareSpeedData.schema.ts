import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from "@mongoosejs/double";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ShareSpeedData extends Document {

    @Prop()
    AppType: number;

    @Prop()
    PlayerId: number;

    @Prop({default: 0})
    apprenticeCount: number;

    @Prop({default: 0})
    apprenticeActCount: number;

    @Prop({default: 0})
    grandApprenticeCount: number;

    @Prop({default: 0})
    totalRedPack: number;

    @Prop({default: 0})
    totalGold: number;

    @Prop({default: 0})
    conPlayerId: number;

    @Prop({default: 0})
    totalContribution: number;

    @Prop({default: 0})
    adherentsLevel: number;

    @Prop({type: SchemaTypes.Long})
    conRegisterTime;

    @Prop()
    dateTime: number;

    @Prop({type: SchemaTypes.Long})
    beginTime;

    @Prop({type: SchemaTypes.Long})
    endTime;
}

export const ShareSpeedDataSchema = SchemaFactory.createForClass(ShareSpeedData);

export const ShareSpeedDataModel = {
    name: ShareSpeedData.name,
    schema: ShareSpeedDataSchema,
    collection: "ShareSpeedData"
};
