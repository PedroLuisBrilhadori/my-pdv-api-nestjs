import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { FindOptionsDto } from '@app/common/database';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { FindUserService } from '../services';

@Controller('user')
export class FindUserController {
    constructor(private service: FindUserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    @Roles(Role.User)
    async execute(
        @Query()
        options: FindOptionsDto,
    ) {
        return this.service.find(options);
    }
}
