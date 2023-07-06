import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ToggleActiveProductService } from '../services';

@Controller('products')
export class ToggleActiveController {
    constructor(private service: ToggleActiveProductService) {}

    @Get(':name/active')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    execute(@Param('name') name: string) {
        return this.service.toggleActive(name);
    }
}
