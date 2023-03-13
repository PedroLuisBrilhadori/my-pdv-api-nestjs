import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Item } from '.';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    controllers: [CartController],
    providers: [CartService],
    imports: [TypeOrmModule.forFeature([Cart, Item])],
    exports: [TypeOrmModule],
})
export class CartModule {}
