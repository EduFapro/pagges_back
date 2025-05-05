import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { BookshelfState } from '@prisma/client';

@Injectable()
export class PersonalLibraryService {
    constructor(private readonly prismaService: PrismaService) { }

    async addBookToList(user_id: number, book_id: number, listToAdd: BookshelfState) {
        const user = await this.prismaService.user.findFirst({
            where: {
                user_id: user_id,
            }
        })
        if (!user) throw new NotFoundException('usuário não encontrado')

        const book = await this.prismaService.book.findUnique({
            where: {
                book_id: book_id,
            }
        })
        if (!book) throw new NotFoundException('livro não encontrado')

        const exists = await this.prismaService.userBookshelfState.findUnique({
            where: {
                user_id_book_id: {
                    user_id,
                    book_id,
                },
            },
        });

        console.log('Já existe?', !!exists);

        if (exists) {
            const update = await this.prismaService.userBookshelfState.update({
                where: {
                    user_id_book_id: {
                        user_id,
                        book_id,
                    },
                },
                data: {
                    state: { set: listToAdd },
                },
            });
            return update;
        } else {
            const create = await this.prismaService.userBookshelfState.create({
                data: {
                    user_id,
                    book_id,
                    state: listToAdd,
                },
            });
            return create;
        }
    }

    async removeBookFromList(user_id: number, book_id: number) {
        const user = await this.prismaService.user.findFirst({
            where: {
                user_id: user_id,
            }
        })
        if (!user) throw new NotFoundException('usuário não encontrado')

        const book = await this.prismaService.book.findUnique({
            where: {
                book_id: book_id,
            }
        })
        if (!book) throw new NotFoundException('livro não encontrado')

        const remove = await this.prismaService.userBookshelfState.delete({
            where: {
                user_id_book_id: {
                    user_id: user_id,
                    book_id: book_id,
                },
            }
        })

        return remove;
    }

    async getBooksArray(user_id: number, state: BookshelfState) {
        const user = await this.prismaService.user.findFirst({
            where: {
                user_id: user_id,
            }
        });
    
        console.log("User found:", user);
        if (!user) throw new NotFoundException('usuário não encontrado');
    
        const arrayList = await this.prismaService.userBookshelfState.findMany({
            where: {
                user_id: user_id,
                state: state
            },
            include: {
                book: {
                    include: {
                        ratings: {
                            where: {
                                user_id: user_id,
                            },
                            select: {
                                rating: true,
                            }
                        }
                    }
                }
            }
        });
    
        return arrayList.map(entry => {
            const book = entry.book;
            
            if (book.isbn) {
                book.isbn = convertBigIntToString(book.isbn);
            }
    
            const userRating = book.ratings.length > 0 ? book.ratings[0].rating : null;

            return {
                ...entry,
                book, 
                userRating,
            };
        });
    }
    


    async getUserStatistics(user_id: number) {
        const user = await this.prismaService.user.findFirst({
            where: {
                user_id: user_id,
            }
        })
        if (!user) throw new NotFoundException('usuário não encontrado')

        const arrayList = await this.prismaService.userBookshelfState.findMany({
            where: {
                user_id: user_id,
                state: 'READ'
            },
            include: {
                book: true,
            }
        })

        const totalPages = arrayList.reduce((acc, item) => {
            return acc + (item.book?.pages ?? 0);
        }, 0);

        return totalPages
    }
}

function convertBigIntToString(obj: any): any {
    if (typeof obj === 'bigint') {
      return obj.toString();
    }
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = convertBigIntToString(obj[key]);
      });
    }
    return obj;
  }
