// src/auth/jwt-auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Bearer Token not found')
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = this.jwtService.verify(token)
      // Optionally attach user info to request (req.user = payload)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error)
    }

    return next()
  }
}
