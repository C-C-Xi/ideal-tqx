import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

@Schema()
export class TNTData extends Document {

    @Prop()
    ColumnA: number;

    @Prop()
    ColumnB: number;

    @Prop()
    ColumnC: number;

    @Prop()
    ColumnD: number;

    @Prop()
    ColumnE: number;

    @Prop()
    ColumnF: number;

    @Prop()
    ColumnG: number;

    @Prop()
    ColumnH: number;

    @Prop()
    ColumnI: number;

    @Prop()
    ColumnJ: number;
}

export const TNTDataSchema = SchemaFactory.createForClass(TNTData);

export const TNTDataModel = {
    name: TNTData.name,
    schema: TNTDataSchema,
    collection: 'TNT_Data'
};
