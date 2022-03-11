import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityBaseConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    effect_value: number;


    @Prop()
    desc: string;



}

export const PlaneBossActivityBaseConfigSchema = SchemaFactory.createForClass(PlaneBossActivityBaseConfig);

export const PlaneBossActivityBaseConfigModel = {
    name: PlaneBossActivityBaseConfig.name,
    schema: PlaneBossActivityBaseConfigSchema,
    collection: 'planeBossActivityBaseConfig'
};
