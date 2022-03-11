import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PersonalPoolCtrl extends Document {

    @Prop()
    id: number;

    @Prop()
    playType: number;

    @Prop()
    waterLineParam: number;

    @Prop()
    ctrlRate: number;
}

export const PersonalPoolCtrlSchema = SchemaFactory.createForClass(PersonalPoolCtrl);

export const PersonalPoolCtrlModel = {
    name: PersonalPoolCtrl.name,
    schema: PersonalPoolCtrlSchema,
    collection: 'personalPoolCtrlConfig'
};
