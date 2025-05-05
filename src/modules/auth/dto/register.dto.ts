import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsBoolean()
  isAuthor: boolean
}
