import {
  IsString,
  IsArray,
  MaxLength,
  ArrayMaxSize,
  IsOptional,
  IsInt,
  ArrayUnique,
} from 'class-validator'

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string

  @IsOptional()
  @IsString()
  @MaxLength(250)
  biography?: string

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3, { message: 'O número máximo de gêneros favoritos é 3' })
  @ArrayUnique()
  @IsInt({ each: true })
  genreIds?: number[]
}