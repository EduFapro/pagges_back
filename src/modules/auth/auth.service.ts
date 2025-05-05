import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, username, isAuthor } = registerDto

    const userExists = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    })
    if (userExists) {
      throw new BadRequestException('Usuário já existe com este e-mail')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
        name: name,
        is_author: isAuthor,
      },
    })

    const payload = { sub: user.user_id, email: user.email, id: user.user_id }
    const token = await this.jwtService.signAsync(payload)

    return { message: 'Usuário cadastrado com sucesso', accessToken: token }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado com este e-mail')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new UnauthorizedException('Email ou senha inválido')
    }

    const payload = { sub: user.user_id, email: user.email, id: user.user_id }
    const token = await this.jwtService.signAsync(payload)

    return { message: 'Login realizado com sucesso', accessToken: token }
  }
}
