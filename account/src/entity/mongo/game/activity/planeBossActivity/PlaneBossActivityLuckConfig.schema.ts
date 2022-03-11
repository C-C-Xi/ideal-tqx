import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityLuckConfig extends Document {
    @Prop()
    Id: number;


    @Prop()
    weight: number;


    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }]))
    Luck_draw_item: Record<string, any>;
}

export const PlaneBossActivityLuckConfigSchema = SchemaFactory.createForClass(PlaneBossActivityLuckConfig);

export const PlaneBossActivityLuckConfigModel = {
    name: PlaneBossActivityLuckConfig.name,
    schema: PlaneBossActivityLuckConfigSchema,
    collection: 'planeBossActivityLuckConfig'
};
