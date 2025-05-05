import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PostDto {

  @IsNumber({}, { message: 'O id do livro deve ser um número.' }) 
  @IsNotEmpty({ message: 'O id do livro não pode ser vazio.' })
  book_id: number

  @IsBoolean({ message: 'O campo is_spoiler deve ser um booleano.' })
  is_spoiler: boolean = false

  @IsString({ message: 'O campo title deve ser uma string.' })
  title?: string

  @IsString({ message: 'O campo text deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo text não pode ser vazio.' })
  text: string

  @IsBoolean({ message: 'O campo is_review deve ser um booleano.' })
  is_review: boolean = false

  @IsNumber({}, { message: 'O campo parent_id deve ser um número.' })
  parent_id?: number
}
