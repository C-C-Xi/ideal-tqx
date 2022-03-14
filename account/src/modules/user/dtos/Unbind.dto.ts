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

export class UnbindDto {
  @ApiPropertyOptional({  description: 'ip' })
  readonly ip: string;


  @ApiPropertyOptional({
    description: '小时',
  })

  @IsNumber()
  readonly hour?: number;


}
