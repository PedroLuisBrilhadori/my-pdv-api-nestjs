import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDatabaseProviders } from '@app/common';
import { JwtService } from '@nestjs/jwt';

import { Product } from './model/product.model';
import {
    CreateProductController,
    DeleteProductController,
    FindOneProductController,
    FindProductController,
    UpdateInventoryController,
    UpdatePriceController,
} from './controllers';

import {
    CreateProductService,
    DeleteProductService,
    FindOneProductService,
    FindProductService,
    UpdateInventoryService,
    UpdatePriceService,
} from './services';

@Module({
    controllers: [
        CreateProductController,
        FindProductController,
        FindOneProductController,
        DeleteProductController,
        UpdateInventoryController,
        UpdatePriceController,
    ],
    providers: [
        CreateProductService,
        FindOneProductService,
        FindProductService,
        DeleteProductService,
        UpdateInventoryService,
        UpdatePriceService,
        ...GetDatabaseProviders(Product),
        JwtService,
    ],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
