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
    ToggleActiveController,
    UpdateInventoryController,
    UpdatePriceController,
} from './controllers';

import {
    CreateProductService,
    DeleteProductService,
    FindOneProductService,
    FindProductService,
    ToggleActiveProductService,
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
        ToggleActiveController,
    ],
    providers: [
        CreateProductService,
        FindOneProductService,
        FindProductService,
        DeleteProductService,
        UpdateInventoryService,
        UpdatePriceService,
        ToggleActiveProductService,
        ...GetDatabaseProviders(Product),
        JwtService,
    ],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
