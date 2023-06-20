import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../Auth/guards/jwt-auth.guard';
import { DeleteProductService } from '../services';

@Controller('products')
export class DeleteProductController {
    constructor(private service: DeleteProductService) {}

    @Delete(':name')
    @UseGuards(JwtAuthGuard)
    async execute(@Param() { name }) {
        return this.service.delete(name);
    }
}
