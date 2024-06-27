import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Example extends BaseEntity {
  @Column({ length: 500 })
  name: string;
}
