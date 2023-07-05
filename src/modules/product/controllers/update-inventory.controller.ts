import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';

import { UpdateInventoryService } from '../services';
import { UpdateInventoryDto } from '../dto';

@Controller('products')
export class UpdateInventoryController {
    constructor(private service: UpdateInventoryService) {}

    @Post('/:name/increment')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    increment(@Param('name') name: string, @Body() dto: UpdateInventoryDto) {
        return this.service.increment(name, dto);
    }

    @Post('/:name/decrement')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.User)
    decrement(@Param('name') name: string, @Body() dto: UpdateInventoryDto) {
        return this.service.decrement(name, dto);
    }
}
