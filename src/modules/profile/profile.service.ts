import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProfileDto } from './dto/profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { Prisma } from '@prisma/client'
import { fromByteArray } from 'base64-js'

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          followers: true,
          following: true,
          genres: {
            include: {
              genre: true,
            },
          },
        },
      })

      if (!user) {
        throw new NotFoundException('Usuário não encontrado')
      }

      const friendsNumber = user.followers.length + user.following.length
      const favoriteGenres = user.genres.map((ug) => ug.genre.genre_name)

      const profileImage = user.profile_image
        ? fromByteArray(user.profile_image)
        : null

      const profileDto: ProfileDto = {
        id: user.user_id,
        name: user.name,
        email: user.email,
        biography: user.biography || '',
        favouriteGenres: favoriteGenres,
        readKm: user.pages || 0,
        readBooks: user.pages || 0,
        ranking: user.points || 0,
        friendsNumber: friendsNumber,
        isAuthor: user.is_author,
        profileImage: profileImage
      }

      return {
        status: 200,
        message: 'Perfil encontrado com sucesso.',
        data: profileDto,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message)
    }
  }

  async getProfileImage(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      })
      
      if (!user) {
        throw new NotFoundException('Usuário não encontrado')
      }
      
      return {
        status: 200,
        message: 'Perfil encontrado com sucesso.',
        data: user.profile_image ? fromByteArray(user.profile_image) : null,
      }
      
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message)
    }
  }
  
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File) {
    if (
      !updateProfileDto.name &&
      !updateProfileDto.biography &&
      !updateProfileDto.genreIds &&
      !file
    ) {
      throw new BadRequestException('Nenhum campo fornecido para atualização')
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { user_id: id },
      })

      if (!user) {
        throw new NotFoundException('Usuário não encontrado')
      }

      return await this.prisma.$transaction(async (tx) => {
        if (updateProfileDto.name || updateProfileDto.biography) {
          await tx.user.update({
            where: { user_id: id },
            data: {
              ...(updateProfileDto.name && { name: updateProfileDto.name }),
              ...(updateProfileDto.biography && { biography: updateProfileDto.biography }),
              ...(file && { profile_image: file.buffer }),
            },
          })
        }

        if (updateProfileDto.genreIds && updateProfileDto.genreIds.length > 0) {
          await tx.userGenre.deleteMany({
            where: { user_id: id },
          })

          const genres = await tx.genre.findMany({
            where: {
              genre_id: {
                in: updateProfileDto.genreIds,
              },
            },
          })

          if (genres.length !== updateProfileDto.genreIds.length) {
            throw new BadRequestException(
              'Um ou mais gêneros informados não existem',
            )
          }

          for (const genreId of updateProfileDto.genreIds) {
            await tx.userGenre.create({
              data: {
                user_id: id,
                genre_id: genreId,
              },
            })
          }
        }

        return { status: 200, message: 'Perfil atualizado com sucesso.', userId: id }

      })
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Um ou mais gêneros informados não existem',
          )
        }
      }

      throw new BadRequestException(
        'Erro ao atualizar perfil: ' + error.message,
      )
    }
  }
}
