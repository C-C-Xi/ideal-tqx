import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class  ConfigSlotsRoomEgg extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ''})
    CashNumWeight: string;
}

export const  ConfigSlotsRoomEggSchema = SchemaFactory.createForClass( ConfigSlotsRoomEgg);

export const  ConfigSlotsRoomEggModel = {
    name:  ConfigSlotsRoomEgg.name,
    schema:  ConfigSlotsRoomEggSchema,
    collection: 'ConfigSlots_RoomEgg'
};
