import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';

export type Bcrypt = {
    hash: typeof hash;
    compare: typeof compare;
};

@Controller('user')
export class UserController {
    constructor(
        private service: UserService,
        @Inject('BCRYPT') private bcrypt: Bcrypt,
    ) {}

    @Post('register')
    async register(@Body() createUser: CreateUserDto) {
        const user = await this.service.register({
            ...createUser,
            password: await this.bcrypt.hash(createUser.password, 10),
        });

        return {
            success: true,
            user: {
                ...user,
                password: undefined,
            },
        };
    }

    @Post('login')
    async login(@Body() user: LoginUserDto) {}
}
