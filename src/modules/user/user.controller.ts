import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { Role, Roles } from '../Auth';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async register(@Body() createUser: CreateUserDto) {
        const {
            user: { password, ...user },
        } = await this.userService.create({
            ...createUser,
        });

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    async getUser(@Param() { email }) {
        const {
            user: { password, ...user },
        } = await this.userService.findOne(email);
        return user;
    }
}
