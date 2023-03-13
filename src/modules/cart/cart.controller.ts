import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    UseGuards,
    Param,
    Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../Auth/guards/jwt-auth.guard';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createCart: CreateCartDto) {
        return this.cartService.create(createCart);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        return this.cartService.find();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() { id }) {
        return this.cartService.delete(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param() { id }, @Body() updateCart: UpdateCartDto) {
        return this.cartService.update(id, updateCart);
    }
}
