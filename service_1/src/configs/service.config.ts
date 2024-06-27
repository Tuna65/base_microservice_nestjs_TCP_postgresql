export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.BUSINESS_SERVICE_PORT ?? 8883,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
