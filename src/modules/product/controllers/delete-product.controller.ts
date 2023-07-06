import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { Role, Roles, JwtAuthGuard } from '@app/modules/Auth';

import { DeleteProductService } from '../services';

@Controller('products')
export class DeleteProductController {
    constructor(private service: DeleteProductService) {}

    @Delete(':name')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async execute(@Param() { name }) {
        return this.service.delete(name);
    }
}
