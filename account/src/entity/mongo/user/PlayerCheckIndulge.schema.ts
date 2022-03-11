import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class PlayerCheckIndulge extends Document {
    @Prop()
    uid: number;
    @Prop()
    unionId: string;
    @Prop()
    idCard: string;
    @Prop()
    realName: string;
    @Prop()
    age: number;
    @Prop()
    msg: string;
    @Prop({type:SchemaTypes.Long})
    time;
    @Prop()
    times: number
}

export const PlayerCheckIndulgeSchema = SchemaFactory.createForClass(PlayerCheckIndulge);


export const PlayerCheckIndulgeModel = {
    name: PlayerCheckIndulge.name,
    schema: PlayerCheckIndulgeSchema,
    collection: 'playerCheckIndulge'
};
