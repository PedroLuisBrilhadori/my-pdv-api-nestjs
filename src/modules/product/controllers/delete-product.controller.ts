import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../Auth/guards/jwt-auth.guard';
import { DeleteProductService } from '../services';
import { Role, Roles } from '@app/modules/Auth';

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
