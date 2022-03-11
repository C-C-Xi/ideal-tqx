import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigEarningsPlayType extends Document {
    @Prop({default: 0})
    allEarnings: number;

    @Prop({default: 0})
    dayEarnings: number;

    @Prop({default: 0})
    playType: number;

    @Prop()
    setType: string;
}

export const ConfigEarningsPlayTypeSchema = SchemaFactory.createForClass(ConfigEarningsPlayType);

export const ConfigEarningsPlayTypeModel = {
    name: ConfigEarningsPlayType.name,
    schema: ConfigEarningsPlayTypeSchema,
    collection: 'Config_EarningsPlayType'
};
