import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ServiceController } from './service.controller';
import { ServiceProviders } from './service.provider';
import { ServiceService } from './service.service';
import { HttpModule } from '@nestjs/axios';
import { HttpServices } from 'src/common/http/config.http';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ServiceController],
  providers: [...ServiceProviders, ServiceService, HttpServices],
})
export class ServiceModule {}
