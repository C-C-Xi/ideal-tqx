import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class InteriorPlayer extends Document {
    @Prop()
    uid: number;

    @Prop()
    realName: string;
}

export const InteriorPlayerSchema = SchemaFactory.createForClass(InteriorPlayer);

export const InteriorPlayerModel = {
    name: InteriorPlayer.name,
    schema: InteriorPlayerSchema,
    collection: 'interiorPlayer'
};
