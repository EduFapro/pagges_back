import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from 'src/interfaces/user-info.interface'
export const UserTokenInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest()
    const userInfo: JwtPayload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: request.user.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: request.user.email,
    }
    return userInfo
  },
)
