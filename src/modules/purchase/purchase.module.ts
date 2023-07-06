import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, ProductModule } from '@app/modules/product';
import { Purchase, Item } from './model';
import { CreatePurchaseController } from './controllers';
import { IsProductActiveContraint } from 'src/decorators';
import { CreatePurchaseService } from './services';
import { GetDatabaseProviders } from '@app/common/database';

@Module({
    controllers: [CreatePurchaseController],
    providers: [
        CreatePurchaseService,
        ...GetDatabaseProviders(Product),
        JwtService,
        IsProductActiveContraint,
    ],
    imports: [ProductModule, TypeOrmModule.forFeature([Purchase, Item])],
    exports: [TypeOrmModule],
})
export class PurchaseModule {}
