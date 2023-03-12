import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    async getUser(@Param() { email }) {
        const { password, ...user } = await this.userService.findOne(email);
        return user;
    }
}
