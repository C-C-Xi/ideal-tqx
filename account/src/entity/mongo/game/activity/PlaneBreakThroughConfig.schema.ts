import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlaneBreakThroughConfig extends Document {
    @Prop()
    id: number;

    @Prop()
    modelType: number;

    @Prop()
    type: number;

    @Prop()
    monster: number;

    @Prop()
    conditionsType: number;

    @Prop()
    conditionsValue: string;

    @Prop(raw([{
        itemId: {type: Number},
        type: {type: Number},
        num: {type: Number}
    }]))
    reward: Record<string, any>;


    @Prop()
    isDrop: number;

    @Prop()
    openSkill: number;

    @Prop()
    isAdjustFire: number;

    @Prop()
    monsterPreview: string;

    @Prop({default: 0})
    firePower: number;
}

export const PlaneBreakThroughConfigSchema = SchemaFactory.createForClass(PlaneBreakThroughConfig);

export const PlaneBreakThroughConfigModel = {
    name: PlaneBreakThroughConfig.name,
    schema: PlaneBreakThroughConfigSchema,
    collection: 'planeBreakThroughConfig'
};
