import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtUser } from './jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUser | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtUser | undefined;
  },
);

