import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserDTO } from './user.dto';
import { PaginationDTO } from 'src/utils/type';

export class QueryServiceDTO extends PaginationDTO {
  name: string;
  ids: string[];
}

export interface IShopBusinessService {
  query: IPaginationOptions | any;
  user: UserDTO;
}
