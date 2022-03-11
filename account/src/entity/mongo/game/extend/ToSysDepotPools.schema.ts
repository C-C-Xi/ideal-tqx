import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ToSysDepotPools extends Document {
    @Prop()
    CombinedRoomSysDepot: object;
}

export const ToSysDepotPoolsSchema = SchemaFactory.createForClass(ToSysDepotPools);

export const ToSysDepotPoolsModel = {
    name: ToSysDepotPools.name,
    schema: ToSysDepotPoolsSchema,
    collection: 'TO_SysDepotPools'
};
