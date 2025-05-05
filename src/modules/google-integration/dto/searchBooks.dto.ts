import { IsOptional, IsString } from 'class-validator'

export class SearchBooksDto {
  @IsOptional()
  @IsString()
  titulo?: string

  @IsOptional()
  @IsString()
  autor?: string

  @IsOptional()
  @IsString()
  genero?: string
}
