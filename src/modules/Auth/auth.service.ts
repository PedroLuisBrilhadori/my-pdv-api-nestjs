import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.model';
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

    async login(loginUser: LoginUserDto) {
        const payload = { email: loginUser.email };
        const { password, ...user } = await this.userService.findOne(
            loginUser.email,
        );
        return {
            user,
            token: this.jwtService.sign(payload),
        };
    }
}
