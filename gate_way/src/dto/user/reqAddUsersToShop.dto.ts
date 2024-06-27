import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class reqAddUsersToShopDTO {
  @IsNotEmpty({ message: 'ShopName không được để trống!' })
  @ApiProperty({ example: 'ShopName' })
  shopName: string;

  @IsNotEmpty({ message: 'ShopId không được để trống!' })
  @ApiProperty({ example: 'ShopId' })
  shopId: string;

  @IsNotEmpty({ message: 'UserId không được để trống!' })
  @ApiProperty({ example: 'UserId' })
  userIds: string;

  @IsNotEmpty({ message: 'BusinessId không được để trống!' })
  @ApiProperty({ example: 'BusinessId' })
  businessId: string;
}
