import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SuccessRes } from '../../application/common/response/success.res';

@Injectable()
export class SuccessResInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const { statusCode, statusMessage } = context
          .switchToHttp()
          .getResponse();

        const isNormal = statusCode >= 200 && statusCode < 300;
        if (isNormal) {
          return new SuccessRes({
            status: statusCode,
            message: statusMessage,
            data: data,
          });
        }
        return data;
      }),
    );
  }
}
