import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class MedalTaskConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    TaskId: number;

    @Prop()
    Type: number;

    @Prop()
    NextId: number;

    @Prop()
    NeedContribution: number;

    @Prop(raw([{type: {type: Number}, itemId: {type: Number}, num: {type: Number}}]))
    GetItem: Record<string, any>;
}

export const MedalTaskConfigSchema = SchemaFactory.createForClass(MedalTaskConfig);

export const MedalTaskConfigModel = {
    name: MedalTaskConfig.name,
    schema: MedalTaskConfigSchema,
    collection: 'medalTaskConfig'
};
