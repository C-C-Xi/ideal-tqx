import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Channels extends Document {
    @Prop()
    id: number;

    @Prop()
    channelName: string;

    @Prop()
    adType: string;

    @Prop(raw([{type: String}]))
    adEventType: Record<string, any>;

    @Prop()
    playType: number;

    @Prop({default: 100})
    advWeight: number;

    @Prop()
    promotionType: object;

    @Prop()
    callBackFun: string;

    @Prop()
    callBackParams: object;

    @Prop()
    adid: string;

    @Prop()
    key: string;

    @Prop()
    status: boolean;

    @Prop({default: true})
    rechargeSW: boolean;

    @Prop({default: true})
    exchangeSW: boolean;

    @Prop({default: 1})
    noviceGuideType: number;

    @Prop()
    screenTimeSwitch: boolean;

    @Prop({default: 0})
    AppType: number;

    @Prop()
    updateTime: number;

    @Prop()
    createTime: number;
}

export const ChannelsSchema = SchemaFactory.createForClass(Channels);

//定义索引
ChannelsSchema.index({id: 1}, {background: true, unique: true, name: 'Channels_id'});

export const ChannelsModel = {
    name: Channels.name,
    schema: ChannelsSchema,
    collection: 'channelConfig'
};
