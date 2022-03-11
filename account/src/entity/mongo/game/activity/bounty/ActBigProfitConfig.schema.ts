import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ActBigProfitConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    activityId: number;

    @Prop()
    title: string;

    @Prop()
    tasks: string;

    @Prop()
    goodsId: number;

    @Prop()
    rechargeTip: string;
}

export const ActBigProfitConfigSchema = SchemaFactory.createForClass(ActBigProfitConfig);

export const ActBigProfitConfigModel = {
    name: ActBigProfitConfig.name,
    schema: ActBigProfitConfigSchema,
    collection: 'actBigProfitConfig'
};
