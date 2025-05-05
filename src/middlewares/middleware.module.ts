import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AuthModule } from '../modules/auth/auth.module'
import { JwtAuthMiddleware } from '../modules/auth/jwt-auth.middleware'
import { LoggingMiddleware } from './http-logger.middeware'

@Module({
  imports: [AuthModule],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // HTTP Logger Middleware
    consumer.apply(LoggingMiddleware).forRoutes('*')

    // JWT Auth Middleware
    // Apply JWT Auth Middleware to all routes except for login and register
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/register', method: RequestMethod.ALL },
      )
      .forRoutes('*')
  }
}
