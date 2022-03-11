import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityExchangeConfig extends Document {
    @Prop()
    Id: number;

    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    Exchange_item: Record<string, any>;


    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    Exchange_reward: Record<string, any>;

}

export const PlaneBossActivityExchangeConfigSchema = SchemaFactory.createForClass(PlaneBossActivityExchangeConfig);

export const PlaneBossActivityExchangeConfigModel = {
    name: PlaneBossActivityExchangeConfig.name,
    schema: PlaneBossActivityExchangeConfigSchema,
    collection: 'planeBossActivityExchangeConfig'
};
