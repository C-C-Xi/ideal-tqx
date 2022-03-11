import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlanePointGoldCommonConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    freeTime: number;

    @Prop()
    jackpot: number;

    @Prop()
    proportion: number;

    @Prop()
    cost: number;

    @Prop()
    costAdd: number;

    @Prop()
    costMax: number;


    @Prop(raw([{
        key: {type: String},
        value: {type: Number}
    }]))
    proportionAddition: Record<string, any>;


}

export const PlanePointGoldCommonConfigSchema = SchemaFactory.createForClass(PlanePointGoldCommonConfig);

export const PlanePointGoldCommonConfigModel = {
    name: PlanePointGoldCommonConfig.name,
    schema: PlanePointGoldCommonConfigSchema,
    collection: 'planePointGoldCommonConfig'
};
