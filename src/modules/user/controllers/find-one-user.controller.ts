import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { FindOneUserService } from '../services';
import { JwtAuthGuard } from 'src/modules/Auth';

@Controller('user')
export class FindOneUserController {
    constructor(private service: FindOneUserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    async execute(@Param() { email }) {
        return this.service.findOne({ where: { email } });
    }
}
