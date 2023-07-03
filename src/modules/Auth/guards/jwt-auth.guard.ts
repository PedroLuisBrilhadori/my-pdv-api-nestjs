import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../model';
import { ROLES_KEY } from '../decorators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector, private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) return super.canActivate(context);

        const request = context.switchToHttp().getRequest();

        const token = request['headers']['authorization'].replace(
            'Bearer ',
            '',
        );

        if (!token) return false;

        const user = this.jwtService.decode(token) as {
            role: string;
            email: string;
        };

        return requiredRoles.filter((role) => user.role === role).length > 0;
    }
}
