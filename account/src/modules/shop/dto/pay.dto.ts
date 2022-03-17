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

export class googleResultDto {
  @ApiPropertyOptional({required: false, description: 'orderId'})
  @IsString({message: 'orderId必须是字符串'})
  @IsOptional()
  readonly orderId: string;

  @ApiPropertyOptional({required: false, description: 'productId'})
  @IsString({message: 'productId必须是字符串'})
  @IsOptional()
  readonly productId: string;

  @ApiPropertyOptional({required: false, description: 'google token'})
  @IsString({message: 'token必须是字符串'})
  @IsOptional()
  readonly token: string;

  @ApiPropertyOptional({
    required: true,
    description: '请求类型',
    enum: ["", ""],
  })
  @IsEnum(
      { 普通用户: 0, 管理员: 1 },
      { message: '是否管理员？ 1：是, 0：不是' },
  )
  @IsString({message: 'productId必须是字符串'})
  @IsNotEmpty({ message: '身份不能为空' })
  readonly type: string;
}
