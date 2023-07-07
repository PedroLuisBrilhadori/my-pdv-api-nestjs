import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdatePurchaseItemService } from '../services';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { UpdatePurchaseItemsDto } from '../dto';

@Controller('purchase')
export class UpdatePurchaseItemsController {
    constructor(private service: UpdatePurchaseItemService) {}

    @Patch('/:id/items')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    execute(@Param('id') id: string, @Body() dto: UpdatePurchaseItemsDto) {
        return this.service.update(id, dto);
    }
}
