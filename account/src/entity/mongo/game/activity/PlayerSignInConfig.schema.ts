import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlayerSignInConfig extends Document {
    @Prop()
    Id: number;

    @Prop()
    Type: number;

    @Prop()
    Name: string;

    @Prop()
    Day: number;

    @Prop(raw([{
        type: {type: Number},
        id: {type: Number},
        num: {type: Number}
    }]))
    GetItem: Record<string, any>;

    @Prop(raw([{
        type: {type: Number},
        id: {type: Number},
        num: {type: Number}
    }]))
    FirstAward: Record<string, any>;
}

export const PlayerSignInConfigSchema = SchemaFactory.createForClass(PlayerSignInConfig);

export const PlayerSignInConfigModel = {
    name: PlayerSignInConfig.name,
    schema: PlayerSignInConfigSchema,
    collection: 'playerSignInConfig'
};
