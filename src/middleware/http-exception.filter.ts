import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { winstonLogger } from 'src/lib/winston';

@Catch(HttpException) //HttpException이 발생했을때 실행
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err = exception.getResponse();

    const logTxt = `[${request.method}]${request.originalUrl}(${status}) | ${JSON.stringify(
      {
        error: err,
        method: request.method,
        path: request.path,
        query: request.query,
        params: request.params,
        baseUrl: request.baseUrl,
        hostname: request.hostname,
        userAgent: request.get('user-agent'),
        body: request.body,
      },
    )}`;

    if (status >= 400 && status < 500) winstonLogger.warn(logTxt);
    else if (status >= 500) winstonLogger.error(logTxt);

    return response.status(status).json({
      error: err,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
