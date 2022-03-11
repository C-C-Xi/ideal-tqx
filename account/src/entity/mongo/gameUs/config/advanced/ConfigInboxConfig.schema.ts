import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongooseLong from "mongoose-long";
import * as Double from '@mongoosejs/double';
import mongoose from "mongoose";

mongooseLong.default(mongoose);
const SchemaTypes: any = mongoose.Schema.Types;

const ModelDataInt32 = {type: Number, default: 0};
const ModelDataInt64 = {type: SchemaTypes.Long, default: 0};
const ModelDataString = {type: String, default: ''};

@Schema()
export class ConfigInboxConfig extends Document {
    //邮件基础表
    @Prop(raw([{
        Id: ModelDataInt32,
        Type: ModelDataInt32,
        NameId: ModelDataInt32,
        ContentId: ModelDataInt32,
        WildCard: ModelDataString,
    }]))
    InboxConfig: Record<string, any>;

    //邮寄限制表
    @Prop(raw([{
        Id: ModelDataInt32,
        Value: ModelDataString,
    }]))
    InboxLimitConfig: Record<string, any>;
}

export const ConfigInboxConfigSchema = SchemaFactory.createForClass(ConfigInboxConfig);

export const ConfigInboxConfigModel = {
    name: ConfigInboxConfig.name,
    schema: ConfigInboxConfigSchema,
    collection: 'ConfigInbox_Config'
};
