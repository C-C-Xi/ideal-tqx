import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";


mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerAdvertHistory extends Document {
    @Prop()
    PlayerId: number;

    @Prop()
    AdvertId: number;

    @Prop({type: SchemaTypes.Long})
    Time;
}

export const LogPlayerAdvertHistorySchema = SchemaFactory.createForClass(LogPlayerAdvertHistory);

//定义索引
LogPlayerAdvertHistorySchema.index({Time: -1}, {background: true, name: 'LOG_PlayerAdvertHistory_TimeS'});
LogPlayerAdvertHistorySchema.index({PlayerId: -1}, {background: true, name: 'LOG_PlayerAdvertHistory_PlayerId'});
LogPlayerAdvertHistorySchema.index({AdvertId: -1}, {background: true, name: 'LOG_PlayerAdvertHistory_AdvertId'});

export const LogPlayerAdvertHistoryModel = {
    name: LogPlayerAdvertHistory.name,
    schema: LogPlayerAdvertHistorySchema,
    collection: 'LOG_PlayerAdvertHistory'
};
