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

export class CreateLabelDto {
  @ApiPropertyOptional({
    required: true,
    description: '是否启用',
    enum: [0, 1],
  })
  @IsEnum(
    { 普通用户: 0, 管理员: 1 },
    { message: '是否启用？ 1：是, 0：否' },
  )
  @IsNumber()
  @Transform((value) => parseInt(value, 10))
  @IsNotEmpty({ message: '状态不能为空' })
  readonly state?: number;



  @ApiPropertyOptional({
    required: true,
    description: '是否是管理员'
  })
  @IsNumber()
  @Transform((value) => parseInt(value, 10))
  @IsNotEmpty({ message: '标签不能为空' })
  readonly pagId?: number;



  @ApiPropertyOptional({
    description: '排序'
  })
  @IsNumber()
  @Transform((value) => parseInt(value, 10))
  readonly order?: number;

  @ApiPropertyOptional({ required: true, description: '标签' })
  @MaxLength(10, { message: '标签最长10位数' })
  @IsNotEmpty({ message: '标签不能为空' })
  @IsString({ message: '标签必须是字符串' })
  readonly pagName: string;

  @ApiPropertyOptional({ required: false, description: '备注信息' })
  @IsString({ message: '备注信息必须是字符串' })
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ required: true, description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(10, { message: '密码最长为10位数' })
  @MinLength(6, { message: '密码最少6位数' })
  readonly password: string;
}
