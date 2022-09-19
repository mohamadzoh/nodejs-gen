"use strict";
function guardTemplate() {
    return `import { Injectable, CanActivate, ArgumentsHost } from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
 async canActivate(
    context: ArgumentsHost,
  ): Promise<boolean>  {
    const request: Request = context.switchToHttp().getRequest();
    console.log(request.headers)
    return true;
  }
}`;
}
