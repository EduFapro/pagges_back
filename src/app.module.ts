import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { WinstonModule } from 'nest-winston'
import { winstonLoggerConfig } from './config/winston-logger/winston-config'
import { MiddlewareModule } from './middlewares/middleware.module'
import { AuthModule } from './modules/auth/auth.module'
import { PostsModule } from './modules/posts/posts.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { GoogleIntegrationModule } from './modules/google-integration/google-integration.module'
import { ProfileModule } from './modules/profile/profile.module'
import { BooksModule } from './modules/books/books.module'
import { PersonalLibraryModule } from './modules/personal-library/personal-library.module'
import { UserGenresModule } from './modules/user-genres/user-genres.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1d'),
        GOOGLE_API_KEY: Joi.string().required(),
      }),
    }),
    WinstonModule.forRoot(winstonLoggerConfig),
    PrismaModule,
    GoogleIntegrationModule,
    AuthModule,
    PostsModule,
    MiddlewareModule,
    ProfileModule,
    BooksModule,
    UserGenresModule,
    PersonalLibraryModule,
  ],
})
export class AppModule {}
