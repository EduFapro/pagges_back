import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { GoogleIntegrationService } from './google-integration.service'
@Controller('google-integration')
export class GoogleIntegrationController {
  constructor(
    private readonly googleIntegrationService: GoogleIntegrationService,
  ) {}

  @Get('search')
  @HttpCode(200)
  searchByTerm(@Query('term') term: string) {
    return this.googleIntegrationService.searchBooks(term)
  }

  @Get('genre')
  @HttpCode(200)
  searchByGenre(@Query('genre') genre: string) {
    return this.googleIntegrationService.searchByGenre(genre)
  }
}
