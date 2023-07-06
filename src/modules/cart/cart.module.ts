import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '@app/modules/product';
import { Purchase, Item } from './model';
import { CreatePurchaseController } from './controllers';
import { IsProductActiveContraint } from 'src/decorators';

@Module({
    controllers: [CreatePurchaseController],
    providers: [JwtService, IsProductActiveContraint],
    imports: [ProductModule, TypeOrmModule.forFeature([Purchase, Item])],
    exports: [TypeOrmModule],
})
export class CartModule {}
