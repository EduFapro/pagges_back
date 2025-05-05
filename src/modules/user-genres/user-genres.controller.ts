import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserGenresService } from './user-genres.service'
import { CreateUserGenreDto } from './dto/create-user-genre.dto'
import { UserTokenInfo } from 'src/decorators/user-info.decorator'
import { JwtPayload } from 'src/interfaces/user-info.interface'

@Controller('user-genres')
export class UserGenresController {
  constructor(private readonly userGenresService: UserGenresService) {}

  @Post()
  create(@Body() createUserGenreDto: CreateUserGenreDto) {
    return this.userGenresService.create(createUserGenreDto)
  }

  @Get()
  findAllUserGenres() {
    return this.userGenresService.findAllUserGenres()
  }

  @Get('user')
  getUserGenres(@UserTokenInfo() userInfo: JwtPayload) {
    return this.userGenresService.getUserGenres(userInfo.id)
  }

  @Get('available')
  getAvailableGenres() {
    return this.userGenresService.getAvailableGenres()
  }
}
