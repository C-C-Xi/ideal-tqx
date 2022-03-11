import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneJackpotWishCommonConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    key: number;

    @Prop()
    remark: string;

    @Prop()
    value: string;

}

export const PlaneJackpotWishCommonConfigSchema = SchemaFactory.createForClass(PlaneJackpotWishCommonConfig);

export const PlaneJackpotWishCommonConfigModel = {
    name: PlaneJackpotWishCommonConfig.name,
    schema: PlaneJackpotWishCommonConfigSchema,
    collection: 'planeJackpotWishCommonConfig'
};
