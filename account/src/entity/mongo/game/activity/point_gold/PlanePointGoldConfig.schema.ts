import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlanePointGoldConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    cost: number;

    @Prop()
    pt_Addition: number;

    @Prop()
    gj_Addition: number;

    @Prop()
    ss_Addition: number;


    @Prop(raw([{
        itemType: {type: Number},
        itemId: {type: Number},
        itemNum: {type: Number}
    }]))
    reward: Record<string, any>;


}

export const PlanePointGoldConfigSchema = SchemaFactory.createForClass(PlanePointGoldConfig);

export const PlanePointGoldConfigModel = {
    name: PlanePointGoldConfig.name,
    schema: PlanePointGoldConfigSchema,
    collection: 'planePointGoldConfig'
};
