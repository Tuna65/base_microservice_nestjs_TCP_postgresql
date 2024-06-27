import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { HttpServices } from 'src/common/http/config.http';
import { mapToDto } from 'src/configs/dto.config';
import { conflictException, msgResponse } from 'src/configs/exception.config';
import { Example } from 'src/entities/example.entity';
import { EStatus } from 'src/enums/EStatus';
import { TMsgResponse } from 'src/utils/type';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { QueryServiceDTO } from './dto/queryService.dto';
import { ServiceDTO } from './dto/service.dto';

@Injectable({})
export class ServiceService {
  constructor(
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: Repository<Example>,
    private readonly httpServices: HttpServices,
  ) {}

  async create(body: ServiceDTO, token: string): Promise<ServiceDTO> {
    const isName = await this.serviceRepository.findOneBy({ name: body.name });
    if (isName) return conflictException('Tên shop đã tồn tại!');
    body.status = EStatus.ACTIVE;
    body.id = uuidv4().toString();
    await this.serviceRepository.create({
      ...body,
    });
    const entity = await this.serviceRepository.save(body);

    this.httpServices.createRoleDefault(entity.id, token);
    this.httpServices.addUserToBusiness(entity.id, entity.userIds[0], token);

    return mapToDto(ServiceDTO, entity);
  }

  async find(query: QueryServiceDTO): Promise<Pagination<ServiceDTO>> {
    const { name, ids } = query;

    const queryBuilder: SelectQueryBuilder<Example> =
      this.serviceRepository.createQueryBuilder('example');
    queryBuilder.andWhere('lower(unaccent(example.name)) LIKE :name', {
      name: name ? `%${name.toLowerCase()}%` : `%`,
    });
    if (ids && ids?.length > 0)
      queryBuilder.andWhere(`example.id IN (:...ids)`, {
        ids,
      });
    else
      queryBuilder.andWhere(`business.id IN (:businessIds)`, {
        ids: ids?.join(',') ?? null,
      });
    queryBuilder.orderBy('business.createdAt', 'DESC');
    queryBuilder.getMany();

    const data = await paginate<Example>(queryBuilder, query);
    return {
      meta: data.meta,
      items: data.items.map((i) => mapToDto(ServiceDTO, i)),
    };
  }

  async detail(id: string): Promise<ServiceDTO> {
    return mapToDto(ServiceDTO, await this.validateEntity(id));
  }

  async update(id: string, shop: Partial<Example>): Promise<ServiceDTO> {
    this.validateEntity(id);
    await this.serviceRepository.update(id, { ...shop, id, name: shop.name });
    return mapToDto(ServiceDTO, await this.serviceRepository.findOneBy({ id }));
  }

  async delete(id: string): Promise<TMsgResponse> {
    const entity = await this.validateEntity(id);
    const newEntity = { ...entity };
    newEntity.status = EStatus.DELETED;
    await this.serviceRepository.save(newEntity);
    return msgResponse('Delete success!');
  }

  //validate
  async validateEntity(id: string): Promise<Example> {
    const product = await this.serviceRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException('Có lỗi xảy ra vui lòng thử lại!');
    return product;
  }
}
