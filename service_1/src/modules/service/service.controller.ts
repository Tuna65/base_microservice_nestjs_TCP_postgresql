import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EMessagePattern } from 'src/enums/EMessagePartern';
import { QueryServiceDTO } from './dto/queryService.dto';
import { ServiceService } from './service.service';
import { ServiceDTO } from './dto/service.dto';

@Controller('business')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @MessagePattern(EMessagePattern.CREATE_EXAMPLE)
  create(
    @Body() body: { body: ServiceDTO; token: string },
  ): Promise<ServiceDTO> {
    return this.serviceService.create(body.body, body.token);
  }

  @MessagePattern(EMessagePattern.LIST_EXAMPLE)
  async index(@Body() body: QueryServiceDTO): Promise<Pagination<ServiceDTO>> {
    return this.serviceService.find(body);
  }

  @MessagePattern(EMessagePattern.DETAIL_EXAMPLE)
  detail(@Body() body: { id: string }): Promise<ServiceDTO> {
    return this.serviceService.detail(body.id);
  }

  @MessagePattern(EMessagePattern.DELETE_EXAMPLE)
  delete(@Body() body: { id: string }) {
    return this.serviceService.delete(body.id);
  }

  @MessagePattern(EMessagePattern.EDIT_EXAMPLE)
  update(@Body() payload: any): Promise<ServiceDTO> {
    return this.serviceService.update(payload.id, payload.body);
  }
}
