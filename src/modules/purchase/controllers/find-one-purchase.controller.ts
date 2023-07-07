import { Role, Roles } from '@app/modules/Auth';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindOnePurchaseService } from '../services';

@Controller('purchase')
export class FindOnePurchaseController {
    constructor(private service: FindOnePurchaseService) {}

    @Get('/:id')
    @UseGuards()
    @Roles(Role.Admin, Role.User)
    execute(@Param('id') id: string) {
        return this.service.findOne({
            where: { id },
            relations: {
                items: true,
            },
        });
    }
}
