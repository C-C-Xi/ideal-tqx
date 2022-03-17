import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ShareDto {
  @ApiPropertyOptional({  description: 'loginType' })
  readonly loginType: string;

  @ApiPropertyOptional({  description: 'facebook token' })
  readonly access_token: string;

  @ApiPropertyOptional({
    description: '小时',
  })
  @IsNumber()
  readonly quid?: number;


}
