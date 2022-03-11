import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsRoomRewardRoulette extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ''})
    Name: string;

    @Prop({default: ''})
    RouletteGroup: string;

    @Prop({default: 0})
    Initial: number;
}

export const ConfigSlotsRoomRewardRouletteSchema = SchemaFactory.createForClass(ConfigSlotsRoomRewardRoulette);

export const ConfigSlotsRoomRewardRouletteModel = {
    name: ConfigSlotsRoomRewardRoulette.name,
    schema: ConfigSlotsRoomRewardRouletteSchema,
    collection: 'ConfigSlots_RoomRewardRoulette'
};
