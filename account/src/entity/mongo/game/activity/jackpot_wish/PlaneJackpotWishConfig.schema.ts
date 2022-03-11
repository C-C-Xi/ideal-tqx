import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneJackpotWishConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    type: number;

    @Prop()
    weight: number;

    @Prop()
    rewardtype: number;

    @Prop()
    broadcast: boolean;

    @Prop(raw({
        type: {type: Number},
        itemId: {type: Number},
        num: {type: Number}
    }))
    reward: object;


}

export const PlaneJackpotWishConfigSchema = SchemaFactory.createForClass(PlaneJackpotWishConfig);

export const PlaneJackpotWishConfigModel = {
    name: PlaneJackpotWishConfig.name,
    schema: PlaneJackpotWishConfigSchema,
    collection: 'planeJackpotWishConfig'
};
