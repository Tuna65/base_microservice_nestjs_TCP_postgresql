export type TMsgResponse = {
  status: boolean;
  message: string;
};

export interface MetaData {
  page: number;
  limit: number;
}

export class PaginationDTO {
  page = 1;
  limit = 20;
}
