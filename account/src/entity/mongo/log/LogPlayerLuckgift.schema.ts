import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";

mongooseLong.default(mongoose);
let SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogPlayerLuckgift extends Document {
    @Prop({type: SchemaTypes.Long})
    Time;
    @Prop()
    PlayerId: number;
}

export const LogPlayerLuckgiftSchema = SchemaFactory.createForClass(LogPlayerLuckgift);
//定义索引
LogPlayerLuckgiftSchema.index({PlayerId: -1}, {background: true, name: 'LOG_PlayerLuckgift_PlayerId'});
LogPlayerLuckgiftSchema.index({Time: -1}, {background: true, name: 'LOG_PlayerLuckgift_Time'});
export const LogPlayerLuckgiftModel = {
    name: LogPlayerLuckgift.name,
    schema: LogPlayerLuckgiftSchema,
    collection: 'LOG_PlayerLuckgift'
};
