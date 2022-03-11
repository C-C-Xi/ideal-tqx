import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ConfigSlotsRoom extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: ""})
    Name: string;

    @Prop({default: 0})
    Ante: number;

    @Prop({default: 0})
    VipLimit: number;

    @Prop({default: 0})
    GoldLimit: number;

    @Prop({default: 0})
    LevelLimit: number;
}

export const ConfigSlotsRoomSchema = SchemaFactory.createForClass(ConfigSlotsRoom);

export const ConfigSlotsRoomModel = {
    name: ConfigSlotsRoom.name,
    schema: ConfigSlotsRoomSchema,
    collection: 'ConfigLobby_RoomConfig'
};
