import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsItem extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ''})
    Name: string;

    @Prop({default: 0})
    NameId: number;

    @Prop({default: 0})
    Type: number;

    @Prop({default: 0})
    Quality: number;

    @Prop({default: 0})
    PileNum: number;

    @Prop({default: 0})
    Cd: number;

    @Prop({default: 0})
    UiId: number;
}

export const ConfigSlotsItemSchema = SchemaFactory.createForClass(ConfigSlotsItem);

export const ConfigSlotsItemModel = {
    name: ConfigSlotsItem.name,
    schema: ConfigSlotsItemSchema,
    collection: 'ConfigSlots_ItemConfig'
};
