import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsPoolPersonalCommon extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default:0})
    PaymentTime: number;

}

export const ConfigSlotsPoolPersonalCommonSchema = SchemaFactory.createForClass(ConfigSlotsPoolPersonalCommon);

export const ConfigSlotsPoolPersonalCommonModel = {
    name: ConfigSlotsPoolPersonalCommon.name,
    schema: ConfigSlotsPoolPersonalCommonSchema,
    collection: 'ConfigSlots_PoolPersonalCommon'
};
