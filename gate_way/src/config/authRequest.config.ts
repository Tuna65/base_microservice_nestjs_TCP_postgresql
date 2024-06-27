import { UserDto } from 'src/dto/user/user.dto';

export interface IAuthorizedRequest extends Request {
  user?: UserDto;
  shopAlias?: string;
  token?: string;
}
