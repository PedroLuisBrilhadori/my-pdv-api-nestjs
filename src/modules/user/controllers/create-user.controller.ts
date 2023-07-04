import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Role, Roles } from 'src/modules/Auth';
import { CreateUserService } from '../services';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class CreateUserController {
    constructor(private service: CreateUserService) {}

    @Post('')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async execute(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }
}
