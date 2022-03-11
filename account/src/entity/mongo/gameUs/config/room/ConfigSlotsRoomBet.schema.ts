import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class  ConfigSlotsRoomBet extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    FortuneCatBetRate: number;

    @Prop({default: 0})
    BetRate: number;

    @Prop({default: 0})
    Level: number;

    @Prop({default: 0})
    EggType: number;

    @Prop({default: 0})
    EggBetTimes: number;
}

export const  ConfigSlotsRoomBetSchema = SchemaFactory.createForClass( ConfigSlotsRoomBet);

export const  ConfigSlotsRoomBetModel = {
    name:  ConfigSlotsRoomBet.name,
    schema:  ConfigSlotsRoomBetSchema,
    collection: 'ConfigSlots_RoomBet'
};
