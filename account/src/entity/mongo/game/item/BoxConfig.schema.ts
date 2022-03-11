import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class BoxConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    boxName: string;

    @Prop()
    magicalWeapon: number;

    @Prop()
    weaponNum: number;

    @Prop({default:0})
    item1: number;

    @Prop()
    rate1: string;

    @Prop({default:0})
    item2: number;

    @Prop()
    rate2: string;

    @Prop({default:0})
    item3: number;

    @Prop()
    rate3: string;

    @Prop({default:0})
    item4: number;

    @Prop()
    rate4: string;
}

export const BoxConfigSchema = SchemaFactory.createForClass(BoxConfig);

export const BoxConfigModel = {
    name: BoxConfig.name,
    schema: BoxConfigSchema,
    collection: 'boxConfig'
};
