import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        return await this.userService.findPassword(email, password);
    }

    async login({ email }: LoginUserDto) {
        const {
            user: { password, ...user },
        } = await this.userService.findOne(email);

        const payload = { email: user.email, role: user.role };
        return {
            user,
            token: this.jwtService.sign(payload),
        };
    }
}
