import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityJackpotConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    proportion: number;


    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    combination: Record<string, any>;


}

export const PlaneBossActivityJackpotConfigSchema = SchemaFactory.createForClass(PlaneBossActivityJackpotConfig);

export const PlaneBossActivityJackpotConfigModel = {
    name: PlaneBossActivityJackpotConfig.name,
    schema: PlaneBossActivityJackpotConfigSchema,
    collection: 'planeBossActivityJackpotConfig'
};
