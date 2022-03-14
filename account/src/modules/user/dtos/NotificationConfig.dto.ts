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

export class NotificationConfigDto {
  @ApiPropertyOptional({
    description: '小时',
  })

  @IsNumber()
  readonly hour?: number;
}
