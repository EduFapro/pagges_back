import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { UserTokenInfo } from 'src/decorators/user-info.decorator'
import { JwtPayload } from 'src/interfaces/user-info.interface'
import { PostDto } from './dto/post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('user-recent-reviews')
  @HttpCode(200)
  getRecentReviewsFromUser(@UserTokenInfo() userInfo: JwtPayload) {
    return this.postsService.getRecentReviewsFromUser(userInfo.id)
  }

  @Post('create-new-post')
  @HttpCode(201)
  postCreateNewPost(
    @Body() dto: PostDto,
    @UserTokenInfo() userInfo: JwtPayload,
  ) {
    return this.postsService.createNewPost(dto, userInfo.id)
  }

  @Get('reviews/:livroId')
  getReviews(@Param('livroId', ParseIntPipe) livroId: number) {
    return this.postsService.getBookReviews(livroId)
  }
}
