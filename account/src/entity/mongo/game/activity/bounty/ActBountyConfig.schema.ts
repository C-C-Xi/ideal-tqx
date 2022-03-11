import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ActBountyConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    activityId: number;

    @Prop()
    name: string;

    @Prop()
    task: string;

    @Prop()
    price: number;

    @Prop()
    goodsId: number;

    @Prop()
    rechargeTip: string;

    @Prop()
    advertUrl: string;
}

export const ActBountyConfigSchema = SchemaFactory.createForClass(ActBountyConfig);

export const ActBountyConfigModel = {
    name: ActBountyConfig.name,
    schema: ActBountyConfigSchema,
    collection: 'actBountyConfig'
};
