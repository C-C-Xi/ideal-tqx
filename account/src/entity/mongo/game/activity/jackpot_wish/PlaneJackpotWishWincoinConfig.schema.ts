import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneJackpotWishWincoinConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    coin: number;

    @Prop()
    rewardNum: number;
    
}

export const PlaneJackpotWishCommonConfigSchema = SchemaFactory.createForClass(PlaneJackpotWishWincoinConfig);

export const PlaneJackpotWishWincoinConfigModel = {
    name: PlaneJackpotWishWincoinConfig.name,
    schema: PlaneJackpotWishCommonConfigSchema,
    collection: 'planeJackpotWishWincoinConfig'
};
