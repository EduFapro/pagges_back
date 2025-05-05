import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { AppModule } from './app.module'
import { PaggesLogger } from './config/winston-logger/pagges-logger.utils'
import { winstonLoggerConfig } from './config/winston-logger/winston-config'

dotenv.config()

async function bootstrap() {
  if (!process.env.PORT) {
    throw new Error('PORT environment variable is required')
  }

  const rawWinstonLogger = winston.createLogger(winstonLoggerConfig)

  PaggesLogger.setLogger(rawWinstonLogger)

  const nestLogger = WinstonModule.createLogger(winstonLoggerConfig)

  const app = await NestFactory.create(AppModule, {
    logger: nestLogger,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const { PORT } = process.env
  await app.listen(PORT)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
