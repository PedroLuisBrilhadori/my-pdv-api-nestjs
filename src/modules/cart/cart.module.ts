import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '@app/modules/product';
import { Cart, Item } from '.';
import { CreatePurchaseController } from './controllers';
import { IsProductActiveContraint } from 'src/decorators';

@Module({
    controllers: [CreatePurchaseController],
    providers: [JwtService, IsProductActiveContraint],
    imports: [ProductModule, TypeOrmModule.forFeature([Cart, Item])],
    exports: [TypeOrmModule],
})
export class CartModule {}
