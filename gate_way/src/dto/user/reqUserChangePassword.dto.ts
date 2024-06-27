import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class reqUserChangePassword {
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống!' })
  @ApiProperty({ example: '123456' })
  oldPassword: string;

  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống!' })
  @ApiProperty({ example: '123456' })
  newPassword: string;
}
