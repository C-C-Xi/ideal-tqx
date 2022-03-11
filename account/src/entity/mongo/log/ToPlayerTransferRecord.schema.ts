import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class ToPlayerTransferRecord extends Document {
    @Prop({type:SchemaTypes.Long})
    payerId;

    @Prop({type:SchemaTypes.Long})
    payeeId;

    @Prop({type:SchemaTypes.Long})
    sendTSMS;
}

export const ToPlayerTransferRecordSchema = SchemaFactory.createForClass(ToPlayerTransferRecord);

export const ToPlayerTransferRecordModel = {
    name: ToPlayerTransferRecord.name,
    schema: ToPlayerTransferRecordSchema,
    collection: 'TO_PlayerTransferRecord'
};
