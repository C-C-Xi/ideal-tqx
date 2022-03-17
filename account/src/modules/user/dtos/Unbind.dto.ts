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
  @IsNotEmpty()
  readonly accToken: string;


  @ApiPropertyOptional({
    description: '小时',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly appType: number;


}
