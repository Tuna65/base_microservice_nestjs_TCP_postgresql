import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/base/dto.base';

export class ServiceDTO extends BaseDTO {
  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  ownerName: string;

  @Expose()
  createdBy: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  userIds: string[];

  @Expose()
  image: string;
}
