import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductService } from '../services';
import { CreateProductDto } from '../dto/product.dto';
import { JwtAuthGuard, Roles, Role } from '../../Auth';

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
