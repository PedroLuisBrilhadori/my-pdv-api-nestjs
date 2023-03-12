import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';

export type Bcrypt = {
    hash: typeof hash;
    compare: typeof compare;
};

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async register(@Body() createUser: CreateUserDto) {
        const user = await this.userService.create({
            ...createUser,
        });

        return {
            success: true,
            user: {
                ...user,
                password: undefined,
            },
        };
    }
}
