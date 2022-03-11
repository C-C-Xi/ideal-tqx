import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsPoolPersonalEtc extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default:0})
    TodayRecharge: number;

    @Prop({default:0})
    WinBase: number;

    @Prop({default:""})
    WinGolds: string;
}

export const ConfigSlotsPoolPersonalEtcSchema = SchemaFactory.createForClass(ConfigSlotsPoolPersonalEtc);

export const ConfigSlotsPoolPersonalEtcModel = {
    name: ConfigSlotsPoolPersonalEtc.name,
    schema: ConfigSlotsPoolPersonalEtcSchema,
    collection: 'ConfigSlots_PoolPersonalEtc'
};
