import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ChannelsBindAdv extends Document {
    @Prop()
    qid: number;

    @Prop()
    num: number;

    @Prop()
    channelName: string;

    @Prop()
    playType: number;

    @Prop()
    status: boolean;

    @Prop()
    startTime: number;

    @Prop()
    endTime: number;
}

export const ChannelsBindAdvSchema = SchemaFactory.createForClass(ChannelsBindAdv);

//定义索引
ChannelsBindAdvSchema.index({num: -1}, {background: true, name: 'ChannelsBindAdv_num_qid'});
ChannelsBindAdvSchema.index({qid: 1}, {background: true, name: 'ChannelsBindAdv_num_qid'});

export const ChannelsBindAdvModel = {
    name: ChannelsBindAdv.name,
    schema: ChannelsBindAdvSchema,
    collection: 'channelsBindAdv'
};
