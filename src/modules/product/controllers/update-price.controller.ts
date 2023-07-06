import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';

import { UpdatePriceDto } from '../dto';
import { UpdatePriceService } from '../services';

@Controller('products')
export class UpdatePriceController {
    constructor(private service: UpdatePriceService) {}

    @Post('/:name/price')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    execute(@Param('name') name: string, @Body() dto: UpdatePriceDto) {
        return this.service.update(name, dto);
    }
}
