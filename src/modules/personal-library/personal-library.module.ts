import { Module } from '@nestjs/common'
import { PersonalLibraryController } from './personal-library.controller'
import { PersonalLibraryService } from './personal-library.service'

@Module({
  controllers: [PersonalLibraryController],
  providers: [PersonalLibraryService],
})
export class PersonalLibraryModule {}
