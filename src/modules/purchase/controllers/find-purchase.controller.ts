import { FindOptionsDto } from '@app/common/database';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindPurchaseService } from '../services';

@Controller('purchase')
export class FindPurchaseController {
    constructor(private service: FindPurchaseService) {}

    @Get('/')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.User)
    execute(@Query() findOptions: FindOptionsDto) {
        return this.service.find(findOptions);
    }
}
