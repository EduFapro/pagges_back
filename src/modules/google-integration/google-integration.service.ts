import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { PaggesLogger } from 'src/config/winston-logger/pagges-logger.utils'
import { FormattedBooksDtoResponse } from './dto/formattedBooksResponse.dto'
import { ImageLinks } from './types/types'
import {
  GoogleBooksVolumesSchema,
  GoogleBooksVolumesType,
} from './zod/book-schema-zod'
@Injectable()
export class GoogleIntegrationService {
  private readonly apiKey: string
  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow('GOOGLE_API_KEY')
  }

  async searchBooks(queryParam: string) {
    try {
      const query = `intitle:${queryParam}`
      const books = await this.callGoogleBooksApi(query)
      if (!books) {
        throw new InternalServerErrorException('Books data is undefined')
      }
      return this.formatBooksForResponseDto(books)
    } catch (error) {
      PaggesLogger.error('Erro ao buscar livros:', error)
      throw error
    }
  }

  async searchByGenre(genero: string) {
    const query = `subject:${genero}`
    const data = await this.callGoogleBooksApi(query)
    if (!data) {
      throw new InternalServerErrorException('Books data is undefined')
    }
    return await this.formatBooksForResponseDto(data)
  }

  private async upscaleGoogleBooksCoverImage(
    googleBooksImageLink: string,
  ): Promise<string | null> {
    const imageCandidateUrl = googleBooksImageLink.replace(/zoom=\d/, 'zoom=10')

    const responseHeaders = await axios.head(imageCandidateUrl)

    console.log('content-lenght', responseHeaders.headers['content-length'])
    if (
      responseHeaders.headers['content-length'] !== '9103' &&
      responseHeaders.headers['content-length'] !== '4448'
    ) {
      return imageCandidateUrl
    }
    return null
  }

  private async formatBooksForResponseDto(books: GoogleBooksVolumesType) {
    const formattedBooks: FormattedBooksDtoResponse[] = await Promise.all(
      books.map(async (book) => {
        const volumeInfo = book.volumeInfo

        if (
          !volumeInfo.title ||
          !volumeInfo.authors?.length ||
          !volumeInfo.pageCount ||
          !volumeInfo.description ||
          !volumeInfo.imageLinks ||
          !volumeInfo.publishedDate
        ) {
          return null
        }
        const bestBookCoverImage = this.getBestGoogleCoverBookImage(
          volumeInfo.imageLinks,
        )

        if (!bestBookCoverImage) {
          return null
        }

        const upscaledGoogleImageBook =
          await this.upscaleGoogleBooksCoverImage(bestBookCoverImage)

        if (!upscaledGoogleImageBook) {
          return null
        }

        return {
          titulo: volumeInfo.title,
          autores: volumeInfo.authors.filter(
            (author): author is string => !!author,
          ),
          capa: upscaledGoogleImageBook,
          paginas: volumeInfo.pageCount,
          sinopse: volumeInfo.description,
          anoDePublicacao: volumeInfo.publishedDate,
          generos: volumeInfo.categories
            ? volumeInfo.categories.filter(
                (category): category is string => !!category,
              )
            : undefined,
        }
      }),
    ).then((books) => books.filter((book) => book !== null)) // Filter undesired books
    return formattedBooks
  }

  private getBestGoogleCoverBookImage(imageLinks: ImageLinks): string | null {
    // Ordered by pixel width (≈1280 → 800 → 500 → 300 → 128)
    const priority = [
      imageLinks.extraLarge,
      imageLinks.large,
      imageLinks.medium,
      imageLinks.small,
      imageLinks.thumbnail,
      imageLinks.smallThumbnail,
    ]

    return priority.find(Boolean) ?? null
  }

  private async callGoogleBooksApi(queryParams: string) {
    try {
      const urlByTitle = `${this.API_URL}?q=${queryParams}&langRestrict=pt-BR&maxResults=30&printType=books&key=${this.apiKey}`

      const googleResponse = await axios.get(urlByTitle)

      const parsedResponse = GoogleBooksVolumesSchema.safeParse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        googleResponse.data.items,
      )

      if (parsedResponse.error) {
        PaggesLogger.error(
          'Error parsing Google Books API response: ' +
            JSON.stringify(parsedResponse.error),
        )
        throw new InternalServerErrorException()
      }

      const uniqueBooks = this.getUniqueBooksById(parsedResponse.data)

      PaggesLogger.log('Successfully called Google Books API')
      return uniqueBooks
    } catch (error) {
      if (axios.isAxiosError(error)) {
        PaggesLogger.error(
          'An error occoured when calling Google API - Error:' + error.message,
        )
        throw new InternalServerErrorException()
      }
    }
  }

  private getUniqueBooksById(
    books: GoogleBooksVolumesType,
  ): GoogleBooksVolumesType {
    const booksIds = new Set<string>()
    const uniqueBooks: GoogleBooksVolumesType = []

    for (const book of books) {
      if (!booksIds.has(book.id)) {
        booksIds.add(book.id)
        uniqueBooks.push(book)
      }
    }

    return uniqueBooks
  }
}
