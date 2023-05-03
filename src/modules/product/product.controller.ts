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
import { FindOptionsDto } from '@app/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createProduct: CreateProductDto) {
        return this.productService.create(createProduct);
    }

    @Get()
    async getAll(
        @Query()
        options: FindOptionsDto,
    ) {
        return this.productService.find(options);
    }

    @Get(':name')
    async getOne(@Param() { name }) {
        return this.productService.finOne(name);
    }

    @Delete(':name')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() { name }) {
        return this.productService.delete(name);
    }
}
