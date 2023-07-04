import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Item } from '.';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [CartController],
    providers: [CartService, JwtService],
    imports: [TypeOrmModule.forFeature([Cart, Item])],
    exports: [TypeOrmModule],
})
export class CartModule {}
