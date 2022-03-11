import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class WageConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    stageType: number;

    @Prop()
    rate: number;

    @Prop()
    nextDayPersent: number;
}

export const WageConfigSchema = SchemaFactory.createForClass(WageConfig);

export const WageConfigModel = {
    name: WageConfig.name,
    schema: WageConfigSchema,
    collection: 'wageConfig'
};
