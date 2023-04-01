import {
    Controller,
    UseGuards,
    Post,
    Get,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { FindOptions } from 'src/utils/types';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createProduct: CreateProductDto) {
        return this.productService.create(createProduct);
    }

    @Get()
    async getAll(@Query() { name, price }, @Query() options: FindOptions) {
        return this.productService.find({ order: { name, price }, ...options });
    }

    @Get(':name')
    async getOne(@Param() { name }) {
        return this.productService.findOne(name);
    }

    @Delete(':name')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() { name }) {
        return this.productService.delete(name);
    }
}
