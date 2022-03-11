import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PreventBrushConfig extends Document {
    @Prop()
    Key: number;

    @Prop()
    Value: string;

    @Prop()
    Desc: string;

    @Prop()
    Type: number;

    @Prop()
    VideoNum: number;
}

export const PreventBrushConfigConfigSchema = SchemaFactory.createForClass(PreventBrushConfig);

export const PreventBrushConfigModel = {
    name: PreventBrushConfig.name,
    schema: PreventBrushConfigConfigSchema,
    collection: 'preventBrushConfig'
};
