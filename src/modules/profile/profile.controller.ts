import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserTokenInfo } from 'src/decorators/user-info.decorator'
import { JwtPayload } from 'src/interfaces/user-info.interface'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(200)
  getProfile(@UserTokenInfo() userInfo: JwtPayload) {
    return this.profileService.getProfile(userInfo.email)
  }

  @Get('profile-image')
  @HttpCode(200)
  getProfileImage(@UserTokenInfo() userInfo: JwtPayload) {
    return this.profileService.getProfileImage(userInfo.email)
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 7 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/heic',
        ]

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new BadRequestException('Formato de arquivo inválido.'), false)
        }
      },
    }),
  )
  updateProfile(
    @UserTokenInfo() userInfo: JwtPayload,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.updateProfile(
      userInfo.id,
      updateProfileDto,
      file,
    )
  }
}
