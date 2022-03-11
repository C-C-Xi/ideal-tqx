import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlayerInitializeConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    playType: number;

    //新手引导分支控制
    @Prop()
    TestAB: number;

    @Prop()
    TestABStartTime: number;

    @Prop()
    TestABEndTime: number;

    @Prop()
    gold: number;

    @Prop()
    diamond: number;

    @Prop()
    energyCrystal: number;

    @Prop()
    bulletRate: number;

    @Prop()
    frenzy: number;

    @Prop()
    aiming: number;

    @Prop()
    gelivation: number;

    @Prop()
    summon: number;

    @Prop()
    vipLv: number;

    @Prop()
    dropBulletLv: number;

    @Prop()
    benefitsVipLv: number;

    @Prop()
    FreeTime: number;

    @Prop()
    MinMoney: number;

    @Prop()
    ruinsRedRatio: number;

    @Prop()
    ruinsGoldRatio: number;

    @Prop()
    breakThroughLimit: number;

    @Prop()
    ActionMinMoney: number;

}

export const PlayerInitializeConfigSchema = SchemaFactory.createForClass(PlayerInitializeConfig);

export const PlayerInitializeConfigModel = {
    name: PlayerInitializeConfig.name,
    schema: PlayerInitializeConfigSchema,
    collection: 'playerInitializeConfig'
};
