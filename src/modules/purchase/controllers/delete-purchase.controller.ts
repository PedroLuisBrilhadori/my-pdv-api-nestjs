import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeletePurchaseSerivce } from '../services';

@Controller('purchase')
export class DeletePurchaseController {
    constructor(private service: DeletePurchaseSerivce) {}

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    execute(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
