import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';



@Schema()
export class ConfigLobbyGlobalActivityRewards extends Document {
    @Prop({default: 0})
    Id: number;

    @Prop({default: 0})
    Level: number;

    @Prop({default: ''})
    ActivityRewards: string;

}

export const ConfigLobbyGlobalActivityRewardsSchema = SchemaFactory.createForClass(ConfigLobbyGlobalActivityRewards);

export const ConfigLobbyGlobalActivityRewardsModel = {
    name: ConfigLobbyGlobalActivityRewards.name,
    schema: ConfigLobbyGlobalActivityRewardsSchema,
    collection: 'ConfigLobby_GlobalActivityRewardsConfig'
};
