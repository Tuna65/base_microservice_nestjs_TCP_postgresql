import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class authReqLogin {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  @ApiProperty({ example: 'tuna65' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống!' })
  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'storeAlias' })
  storeAlias?: string;
}
