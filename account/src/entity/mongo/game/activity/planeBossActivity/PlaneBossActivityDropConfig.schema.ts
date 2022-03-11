import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBossActivityDropConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    gun: number;


    @Prop(raw([{
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number},
        weight: {type: Number}
    }]))
    DropItem: Record<string, any>;

}

export const PlaneBossActivityDropConfigSchema = SchemaFactory.createForClass(PlaneBossActivityDropConfig);

export const PlaneBossActivityDropConfigModel = {
    name: PlaneBossActivityDropConfig.name,
    schema: PlaneBossActivityDropConfigSchema,
    collection: 'planeBossActivityDropConfig'
};
