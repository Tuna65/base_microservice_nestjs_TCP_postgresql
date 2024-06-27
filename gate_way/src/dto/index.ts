import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BaseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updateAt?: Date;

  deletedAt?: Date;
}

export class PaginationDTO {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @ApiProperty({
    example: 1,
    name: 'page',
    type: Number,
  })
  page = 1;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @ApiProperty({
    example: 10,
    name: 'limit',
    type: Number,
  })
  limit = 20;
}
