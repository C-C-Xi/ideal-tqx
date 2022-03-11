import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class FruitLabaBetCtrlConfig extends Document {
    @Prop()
    betIndex: number;

    @Prop()
    playType: number;

    @Prop()
    rate: string;

    @Prop()
    broadcast: boolean;

    @Prop()
    prize777: number;

    @Prop()
    prize7777: number;

    @Prop()
    prize77777: number;

    @Prop()
    poolIndex: number;
}

export const FruitLabaBetCtrlConfigSchema = SchemaFactory.createForClass(FruitLabaBetCtrlConfig);

export const FruitLabaBetCtrlConfigModel = {
    name: FruitLabaBetCtrlConfig.name,
    schema: FruitLabaBetCtrlConfigSchema,
    collection: 'fruitLabaBetCtrlConfig'
};
