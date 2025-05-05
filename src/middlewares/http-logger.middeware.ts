//// filepath: c:\Users\guimp\OneDrive\Documentos\ages\pagges-backend\src\middlewares\logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { PaggesLogger } from 'src/config/winston-logger/pagges-logger.utils'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    PaggesLogger.log(
      `Incoming HTTP request | ${req.method} | PATH: ${req.originalUrl}`,
    )
    next()
  }
}
