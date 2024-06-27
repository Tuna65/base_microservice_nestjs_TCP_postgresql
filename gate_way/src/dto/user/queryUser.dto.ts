import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDTO } from 'src/shared/helper';

export class QueryUserDTO extends PaginationDTO {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value)
  @ApiProperty({
    example: 'name',
  })
  username: string;

  @Transform(({ value }: TransformFnParams) => value)
  @ApiProperty({
    example: 'name',
  })
  businessId: string;
}
