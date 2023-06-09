import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/create-user.dto';
import { FindOneUserService, FindUserPasswordService } from '../user/services';

@Injectable()
export class AuthService {
    constructor(
        private passwordService: FindUserPasswordService,
        private findOneUserService: FindOneUserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        return await this.passwordService.findPassword(email, password);
    }

    async login({ email }: LoginUserDto) {
        const {
            data: { password, ...user },
        } = await this.findOneUserService.findOne({ where: { email } });

        const payload = { email: user.email, role: user.role };
        return {
            user,
            token: this.jwtService.sign(payload),
        };
    }
}
