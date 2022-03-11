import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneAwardGroup extends Document {
    @Prop()
    Id: number;

    @Prop()
    Order: number;

    @Prop(raw([{
        type: {type: Number},
        id: {type: Number},
        num: {type: Number}
    }]))
    AwardItem: Record<string, any>;

    @Prop()
    Weight: number;

    @Prop()
    Broadcast: number;

    @Prop()
    Level: number;

    @Prop()
    NeedIntegral: number;

    @Prop(raw([{
        type: {type: Number},
        id: {type: Number},
        num: {type: Number}
    }]))
    ExtraReward: Record<string, any>;
}

export const PlaneAwardGroupSchema = SchemaFactory.createForClass(PlaneAwardGroup);

export const PlaneAwardGroupModel = {
    name: PlaneAwardGroup.name,
    schema: PlaneAwardGroupSchema,
    collection: 'aircraftAwardGroupConfig'
};
