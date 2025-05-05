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
import { BooksService } from './books.service'
import { BookRatingDto } from './dto/book-rating.dto'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
    
  @Post('rate-book')
  @HttpCode(201)
  postRatingBook(
    @UserTokenInfo() userInfo: JwtPayload,
    @Body() dto: BookRatingDto,
  ) {
    return this.booksService.postRatingBook(userInfo.id, dto)
  }

  @Get('avarageRankBook/:id')
  @HttpCode(200)
  getAverageRateByBookId(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getAverageRateBook(id)
  }

  @Get('getBookScreen/:bookId')
  getBookScreen(@Param('bookId', ParseIntPipe) bookId: number){
    return this.booksService.getBookScreen(bookId);
  }
}
