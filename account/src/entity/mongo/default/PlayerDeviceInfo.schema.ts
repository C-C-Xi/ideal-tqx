import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class PlayerDeviceInfo extends Document {
    @Prop()
    uid: number;
    @Prop()
    status: number;

    @Prop()
    antiEmuAndroid: object;
}

export const PlayerDeviceInfoSchema = SchemaFactory.createForClass(PlayerDeviceInfo);

//定义索引
PlayerDeviceInfoSchema.index({uid: -1}, {background: true, name: 'playerDeviceInfo_uid'});
PlayerDeviceInfoSchema.index({ip: -1}, {background: true, name: 'playerDeviceInfo_ip'});
PlayerDeviceInfoSchema.index({lastLoginTime: -1}, {background: true, name: 'playerDeviceInfo_lastLoginTime'});

export const PlayerDeviceInfoModel = {
    name: PlayerDeviceInfo.name,
    schema: PlayerDeviceInfoSchema,
    collection: 'playerDeviceInfo'
};


