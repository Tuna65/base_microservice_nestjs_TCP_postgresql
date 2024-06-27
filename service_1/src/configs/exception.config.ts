import { ConflictException, NotFoundException } from '@nestjs/common';
import { TMsgResponse } from 'src/utils/type';

export const conflictException = (message: string) => {
  throw new ConflictException(message);
};

export const notFoundException = (message: string) => {
  throw new NotFoundException(message);
};

export const msgResponse = (message: string): TMsgResponse => {
  return {
    status: true,
    message,
  };
};
