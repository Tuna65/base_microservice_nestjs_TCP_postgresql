import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { UserDto } from 'src/dto/user/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    request.shopAlias =
      request.headers.origin?.split('.')[0]?.split('//')[1] ?? null;

    if (!secured) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(this.unauthorized());

    const userInfo: UserDto = await firstValueFrom(
      this.userServiceClient.send('GET_USER_BY_TOKEN', token),
    );

    if (!userInfo) throw new UnauthorizedException(this.unauthorized());
    if (userInfo.username === 'superadmin') return true;
    request.user = { ...userInfo, token };
    
    request.token = token;
    return true;
  }

  private unauthorized() {
    return {
      error: '401 - Unauthorized',
      message: 'Token hết hạn hoặc không hợp lệ!',
    };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
