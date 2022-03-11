import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsPoolPersonal extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default:0})
    WaterLineParam: number;

    @Prop({default:0})
    PlayType: number;
}

export const ConfigSlotsPoolPersonalSchema = SchemaFactory.createForClass(ConfigSlotsPoolPersonal);

export const ConfigSlotsPoolPersonalModel = {
    name: ConfigSlotsPoolPersonal.name,
    schema: ConfigSlotsPoolPersonalSchema,
    collection: 'ConfigSlots_PoolPersonal'
};
