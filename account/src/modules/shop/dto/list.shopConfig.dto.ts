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

export class ListShopConfigDto {
  @ApiPropertyOptional({
    description: '用户Id'
  })
  @IsNumber()
  readonly uid?: number;

}
