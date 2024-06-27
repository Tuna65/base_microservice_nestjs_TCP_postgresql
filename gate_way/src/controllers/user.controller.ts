import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { IAuthorizedRequest } from 'src/config/authRequest.config';
import { Authorization } from 'src/decorators/auth.decorator';
import { QueryUserDTO } from 'src/dto/user/queryUser.dto';
import { reqAddUsersToShopDTO } from 'src/dto/user/reqAddUsersToShop.dto';
import { reqCreateUserDto } from 'src/dto/user/reqCreatUser.dto';
import { reqUserChangePassword } from 'src/dto/user/reqUserChangePassword.dto';
import { UserDto } from 'src/dto/user/user.dto';
import { EMessagePattern } from 'src/enums/EMessagePattern';

@Controller('')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Get('user')
  public async find(@Query() query: QueryUserDTO): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.LIST_USER, query),
    );
  }

  @Authorization(true)
  @Get('user/me')
  public async findTokenInfo(@Req() request: IAuthorizedRequest): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.DETAIL_USER, {
        id: request.user.id,
      }),
    );
  }

  @Get('user/:id')
  @Authorization(true)
  public async getUserById(@Param('id') id: number): Promise<UserDto> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.DETAIL_USER, { id }),
    );
  }

  @Post('user')
  public async create(@Body() user: reqCreateUserDto): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.CREATE_USER, { user }),
    );
  }

  @Put('user/:id')
  @Authorization(true)
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.EDIT_USER, { id, user }),
    );
  }

  @Delete('user/:id')
  @Authorization(true)
  async deleteUser(@Param('id') id: number): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.DELETE_USER, { id }),
    );
  }

  @Put('user/change-password')
  @Authorization(true)
  async userChangePassword(
    @Body() payload: reqUserChangePassword,
    @Req() request: IAuthorizedRequest,
  ): Promise<any> {
    const user = request.user;
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.USER_CHANGE_PASSWORD, {
        payload,
        user,
      }),
    );
  }

  @Patch('user-add-business')
  @ApiExcludeEndpoint()
  @Authorization(true)
  async addUserToBusiness(
    @Body() body: { businessId: string; userId: string },
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.ADD_USER_TO_BUSINESS, body),
    );
  }

  @Patch('user-add-shop')
  @Authorization(true)
  @ApiExcludeEndpoint()
  async addUserToShop(
    @Body() body: { shopId: string; userId: string },
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.ADD_USER_TO_SHOP, body),
    );
  }

  @Patch('user/add-role')
  @ApiExcludeEndpoint()
  @Authorization(true)
  async addRoleUser(
    @Body() body: { roleId: string; userId: string },
    @Req() request: IAuthorizedRequest,
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.ADD_ROLE_USER, {
        ...body,
        token: request.token,
      }),
    );
  }

  @Post('users/add-shop')
  @Authorization(true)
  @ApiExcludeEndpoint()
  async addUsersToShop(
    @Body() body: reqAddUsersToShopDTO,
    @Req() request: IAuthorizedRequest,
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.ADD_USERS_TO_SHOP, {
        ...body,
        token: request.token,
      }),
    );
  }

  @Put('user-confirm')
  @ApiExcludeEndpoint()
  async confirmJoinShop(
    @Body() body: { shopId: string; userId: string; businessId: string },
  ): Promise<any> {
    return await firstValueFrom(
      this.userServiceClient.send(EMessagePattern.CONFIRM_JOIN_SHOP, body),
    );
  }
}
