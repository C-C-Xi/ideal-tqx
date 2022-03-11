import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsCommon extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ''})
    Key: string;

    @Prop({default: ''})
    Data: string;
}

export const ConfigSlotsCommonSchema = SchemaFactory.createForClass(ConfigSlotsCommon);

export const ConfigSlotsCommonModel = {
    name: ConfigSlotsCommon.name,
    schema: ConfigSlotsCommonSchema,
    collection: 'ConfigSlots_Common'
};
