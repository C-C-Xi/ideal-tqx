import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class ToPlayer extends Document {
    @Prop()
    uid: number;

    @Prop()
    specialLoginFlag: boolean;

    @Prop({type:Object})
    wxInfo;

    @Prop({type:Object})
    deviceInfo;

    @Prop({type:Object})
    partnerInfo;
}

export const ToPlayerSchema = SchemaFactory.createForClass(ToPlayer);

//定义索引
ToPlayerSchema.index({uid: "hashed"}, {background: true, name: 'TO_Player_uid'});
ToPlayerSchema.index({"accountInfo.nickName": "hashed"}, {background: true, name: 'TO_Player.nickName'});
ToPlayerSchema.index({lastLoginTime: -1}, {background: true, name: 'TO_Player_lastLoginTime'});
ToPlayerSchema.index({createTime: -1}, {background: true, name: 'TO_Player_createTime'});

ToPlayerSchema.index({"partnerInfo.grandQuid": -1}, {background: true, name: 'TO_Player_partnerInfo.grandQuid'});
ToPlayerSchema.index({"partnerInfo.quid": -1}, {background: true, name: 'TO_Player_partnerInfo.quid'});
ToPlayerSchema.index({isOnline: 1}, {background: true, name: 'TO_Player_isOnline'});

export const ToPlayerModel = {
    name: ToPlayer.name,
    schema: ToPlayerSchema,
    collection: 'TO_Player'
};
