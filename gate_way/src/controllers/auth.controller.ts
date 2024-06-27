import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { authReqLogin } from 'src/dto/user/authReqLogin.dto';
import { EMessagePattern } from 'src/enums/EMessagePattern';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
  ) {}

  @Post('/login')
  public async login(@Body() body: authReqLogin): Promise<any> {
    return await firstValueFrom(
      this.authService.send(EMessagePattern.AUTH_LOGIN, { body }),
    );
  }
}
