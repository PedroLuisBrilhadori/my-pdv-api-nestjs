import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '@app/modules/product';
import { Purchase, Item } from './model';
import {
    CreatePurchaseController,
    DeletePurchaseController,
    FindOnePurchaseController,
    FindPurchaseController,
    UpdatePurchaseItemsController,
} from './controllers';
import { IsProductActiveContraint } from 'src/decorators';
import {
    CreatePurchaseService,
    DeletePurchaseSerivce,
    FindOnePurchaseService,
    FindPurchaseService,
    UpdatePurchaseItemService,
} from './services';
import { GetDatabaseProviders } from '@app/common/database';

@Module({
    controllers: [
        CreatePurchaseController,
        FindPurchaseController,
        FindOnePurchaseController,
        DeletePurchaseController,
        UpdatePurchaseItemsController,
    ],
    providers: [
        CreatePurchaseService,
        FindOnePurchaseService,
        DeletePurchaseSerivce,
        UpdatePurchaseItemService,
        ...GetDatabaseProviders(Purchase),
        FindPurchaseService,
        JwtService,
        IsProductActiveContraint,
    ],
    imports: [ProductModule, TypeOrmModule.forFeature([Purchase, Item])],
    exports: [TypeOrmModule],
})
export class PurchaseModule {}
