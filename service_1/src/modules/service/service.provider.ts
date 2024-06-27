import { Example } from 'src/entities/example.entity';
import { DataSource } from 'typeorm';

export const ServiceProviders = [
  {
    provide: 'SERVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Example),
    inject: ['DATA_SOURCE'],
  },
];
