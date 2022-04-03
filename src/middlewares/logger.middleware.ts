import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Request logged by middleware ${
        req.originalUrl + ' ' + req.method
      } at ${new Date().toISOString()}`,
    );
    next();
  }
}
