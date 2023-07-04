import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { FindOneUserService } from '../services';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';

@Controller('user')
export class FindOneUserController {
    constructor(private service: FindOneUserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    @Roles(Role.User)
    async execute(@Param() { email }) {
        return this.service.findOne({ where: { email } });
    }
}
