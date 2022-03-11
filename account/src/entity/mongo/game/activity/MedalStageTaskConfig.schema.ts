import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class MedalStageTaskConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    TaskId: number;

    @Prop()
    Name: string;

    @Prop()
    Order: number;

    @Prop()
    Icon: string;

    @Prop(raw([{type: Number}]))
    IncludeTask: Record<string, any>;
}

export const MedalStageTaskConfigSchema = SchemaFactory.createForClass(MedalStageTaskConfig);

export const MedalStageTaskConfigModel = {
    name: MedalStageTaskConfig.name,
    schema: MedalStageTaskConfigSchema,
    collection: 'medalStageTaskConfig'
};
