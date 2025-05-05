import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserGenreDto } from './dto/create-user-genre.dto'

@Injectable()
export class UserGenresService {
  async getAvailableGenres() {
    const genres = await this.prisma.genre.findMany()
  
    return {
      status: 200,
      message: 'Todos os gêneros disponíveis foram encontrados.',
      data: genres,
    }
  }
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserGenreDto) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: dto.userId },
    })
    const genre = await this.prisma.genre.findUnique({
      where: { genre_id: dto.genreId },
    })

    if (!user || !genre) {
      throw new BadRequestException('Usuário ou gênero inválido.')
    }

    const userGenre = await this.prisma.userGenre.create({
      data: {
        user_id: dto.userId,
        genre_id: dto.genreId,
      },
    })

    return {
      status: 201,
      message: 'Gênero favorito adicionado com sucesso.',
      data: userGenre,
    }
  }

  async findAllUserGenres() {
    return this.prisma.userGenre.findMany({
      include: {
        genre: true,
      },
    })
  }

  async getUserGenres(id: number) {
    const userGenres = await this.prisma.userGenre.findMany({
      where: { user_id: id },
      include: { genre: true },
    })

  
    return {
      status: 200,
      message: 'Gêneros favoritos encontrados.',
      data: userGenres.map((ug) => ug.genre.genre_name),
    }
  }
}
