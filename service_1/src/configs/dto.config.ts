import { ClassConstructor, plainToInstance } from 'class-transformer';
import { BaseDTO } from 'src/base/dto.base';
import { BaseEntity } from 'typeorm';

export const mapToDto = <T>(cls: ClassConstructor<T>, entity: any) => {
  return plainToInstance(cls, entity, {
    excludeExtraneousValues: true,
  });
};

export function mapToEntity<T extends BaseEntity, D extends BaseDTO>(
  entity: T,
  body: D,
) {
  return Object.assign(entity, body);
}
