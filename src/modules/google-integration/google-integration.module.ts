import { Module } from '@nestjs/common'
import { GoogleIntegrationService } from './google-integration.service'
import { GoogleIntegrationController } from './google-integration.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  controllers: [GoogleIntegrationController],
  providers: [GoogleIntegrationService],
})
export class GoogleIntegrationModule {}
