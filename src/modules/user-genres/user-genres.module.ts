import { Module } from '@nestjs/common';
import { UserGenresService } from './user-genres.service';
import { UserGenresController } from './user-genres.controller';

@Module({
  controllers: [UserGenresController],
  providers: [UserGenresService],
})
export class UserGenresModule {}
