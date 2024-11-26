import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const logTxt = `[${req.method}]${req.originalUrl}(${statusCode}):: ${statusMessage} | ${JSON.stringify(
        {
          method: req.method,
          path: req.path,
          query: req.query,
          params: req.params,
          baseUrl: req.baseUrl,
          hostname: req.hostname,
          userAgent: req.get('user-agent') || '',
          body: req.body,
        },
      )}`;

      winstonLogger.log(logTxt);
    });

    next();
  }
}
