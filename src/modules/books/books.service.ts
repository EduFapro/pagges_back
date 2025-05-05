import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookRatingDto } from './dto/book-rating.dto';

@Injectable()
export class BooksService {

    constructor(
        private prisma: PrismaService,
    ) {}

    async getAverageRateBook(id: number) {
      const avaregeRating  = await this.prisma.rateBook.aggregate({
        where: { book_id: id },
        _avg:{ rating:true}
      })
      
      
  
      if (avaregeRating._avg.rating === null) {
          throw new NotFoundException('Nenhuma avaliação encontrada para esse livro.')
        }
  
      return {
        status: 200,
        message: 'avaliações encontradas com sucesso.',
        data: Math.round(avaregeRating._avg.rating)
      }
    } 

    async postRatingBook(user_id: number, dto: BookRatingDto) {
        const book = await this.prisma.book.findUnique({
          where: {
            book_id: dto.book_id,
          },
        })
      
        if (!book) {
          throw new NotFoundException('Livro não encontrado');
        }
      
        const alreadyRated = await this.prisma.rateBook.findFirst({
          where: {
            user_id: user_id,
            book_id: dto.book_id,
          },
        })
      
        let rating;
      
        if (alreadyRated) {
          rating = await this.prisma.rateBook.update({
            where: {
              user_id_book_id: {
                user_id: user_id,
                book_id: dto.book_id,
              },
            },
            data: {
              rating: dto.rating,
            },
          })
      
          return {
            message: 'Avaliação atualizada com sucesso',
            rating,
          }

        } else {
          rating = await this.prisma.rateBook.create({
            data: {
              user_id: user_id,
              book_id: dto.book_id,
              rating: dto.rating,
            },
          })
      
          return {
            message: 'Avaliação criada com sucesso',
            rating,
          }

        }
    }

    

    async getBookScreen(book_id: number) {
      const bookInfo = await this.prisma.book.findUnique({
        where: {
          book_id: book_id
        },
      })

      if (!bookInfo) {
        throw new NotFoundException('Livro não encontrado')
      }

      const bookByAuthor = await this.prisma.book.findMany({
        where: {
          authors: bookInfo?.authors
        },
      })

      return[bookInfo, bookByAuthor]
    }

}
