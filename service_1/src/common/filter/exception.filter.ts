import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

export interface HttpExceptionResponse {
    statusCode: number
    message?: string
}

@Catch()
export class HandlerExceptionsFilter extends BaseExceptionFilter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        // console.log(
        //     '🚀 ~ file: handler-exceptions.filter.ts:26 ~ HandlerExceptionsFilter ~ exception:',
        //     exception,
        // )

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string = exception?.message

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            const errorResponse = exception.getResponse()
            const exceptionConvert = errorResponse as HttpExceptionResponse
            message = exceptionConvert.message || exception.stack
        }

        const rpcException = new RpcException({
            message,
            statusCode: status,
        })
        return throwError(() => rpcException.getError())
    }
}
