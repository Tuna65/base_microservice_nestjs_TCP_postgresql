import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = 8000;
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT ?? 8001,
        host: process.env.SERVICE_HOST ?? 'localhost',
      },
      transport: Transport.TCP,
    };
    this.envConfig.authService = {
      options: {
        port: process.env.USER_SERVICE_PORT ?? 8001,
        host: process.env.SERVICE_HOST ?? 'localhost',
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
