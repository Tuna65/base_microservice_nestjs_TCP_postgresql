import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class reqCreateUserDto {
  id: string;

  @IsNotEmpty({ message: 'username không được để trống!' })
  @ApiProperty({ example: 'username' })
  username: string;

  @IsNotEmpty({ message: 'email được để trống!' })
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'email được để trống!' })
  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: '0356888999' })
  @IsOptional()
  @MaxLength(12, { message: 'Số điện thoại không vượt quá 12 ký tự' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại đúng định dạng' })
  phone: string;

  @ApiProperty({ example: 'string' })
  cityId: string;

  @ApiProperty({ example: 'string' })
  districtId: string;

  @ApiProperty({ example: 'string' })
  wardId: string;

  // @IsNotEmpty({ message: 'Địa chỉ không được để trống!' })
  @ApiProperty({ example: 'Thái Bình xi ti' })
  address: string;

  @ApiProperty({ example: '1,2' })
  shopIds: string[];

  @ApiProperty({ example: '1,2' })
  businessIds: string[];
}
