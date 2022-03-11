import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBatteryConfig extends Document {
    @Prop()
    id: number;


    @Prop()
    type: number;

    @Prop()
    value: number;


}

export const PlaneBatteryConfigSchema = SchemaFactory.createForClass(PlaneBatteryConfig);

export const PlaneBatteryConfigModel = {
    name: PlaneBatteryConfig.name,
    schema: PlaneBatteryConfigSchema,
    collection: 'planeBatteryConfig'
};
