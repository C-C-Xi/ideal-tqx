import {
    IsString,
    IsOptional,
    IsEnum,
    IsNumber,
    MaxLength,
    IsNotEmpty,
    MinLength,
} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {Transform} from 'class-transformer';

export class LoginDto {

    @ApiPropertyOptional({required: false, description: '设备Id'})
    @IsString({message: '设备Id必须是字符串'})
    @IsOptional()
    readonly deviceId: string;

    @ApiPropertyOptional({required: false, description: '设备Id类型'})
    @IsString({message: '设备Id类型必须是字符串'})
    @IsOptional()
    readonly deviceIdType: string;

    @ApiPropertyOptional({required: false, description: '设备类型'})
    @IsString({message: '设备类型必须是字符串'})
    @IsOptional()
    readonly deviceType: string;

    readonly devIds: [string];

    @ApiPropertyOptional({required: false, description: '登录类型'})
    @IsString({message: '登录类型必须是字符串'})
    @IsOptional()
    readonly loginType: string;

    @ApiPropertyOptional({required: false, description: 'facebook token'})
    @IsString({message: 'token必须是字符串'})
    @IsOptional()
    readonly token: string;

    @ApiPropertyOptional({
        description: 'appType',
    })
    @IsNumber()
    @IsOptional()
    readonly appType: number;

    @ApiPropertyOptional({
        description: 'qid',
    })
    @IsNumber()
    @IsOptional()
    readonly qid: number;

    @ApiPropertyOptional({
        description: 'qid',
    })
    @IsString({message: 'ip必须是字符串'})
    @IsOptional()
    readonly ip: string;


}
