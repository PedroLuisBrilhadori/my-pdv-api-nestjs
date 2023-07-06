import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, Role } from '@app/modules/Auth';

import { CreateProductDto } from '../dto/product.dto';
import { CreateProductService } from '../services';

@Controller('products')
export class CreateProductController {
    constructor(private service: CreateProductService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async execute(@Body() createProduct: CreateProductDto) {
        return this.service.create(createProduct);
    }
}
