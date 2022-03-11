import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class LogSuperBomb extends Document {
    @Prop()
    PlayerId: number;

    @Prop({type:SchemaTypes.Long})
    TimeTSMS;
}

export const LogSuperBombSchema = SchemaFactory.createForClass(LogSuperBomb);

//定义索引
LogSuperBombSchema.index({TimeTSMS: -1}, {background: true, name: 'LOG_SuperBomb_TimeTSMS'});

export const LogSuperBombModel = {
    name: LogSuperBomb.name,
    schema: LogSuperBombSchema,
    collection: 'LOG_SuperBomb'
};
