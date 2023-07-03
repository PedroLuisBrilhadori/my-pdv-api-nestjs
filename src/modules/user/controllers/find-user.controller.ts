import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { FindOptionsDto } from '@app/common/database';
import { FindUserService } from '../services';
import { JwtAuthGuard } from '../../Auth';

@Controller('user')
export class FindUserController {
    constructor(private service: FindUserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async execute(
        @Query()
        options: FindOptionsDto,
    ) {
        return this.service.find(options);
    }
}
