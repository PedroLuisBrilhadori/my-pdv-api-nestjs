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
} from './controllers';

import {
    CreateProductService,
    DeleteProductService,
    FindOneProductService,
    FindProductService,
    UpdateInventoryService,
} from './services';

@Module({
    controllers: [
        CreateProductController,
        FindProductController,
        FindOneProductController,
        DeleteProductController,
        UpdateInventoryController,
    ],
    providers: [
        CreateProductService,
        FindOneProductService,
        FindProductService,
        DeleteProductService,
        UpdateInventoryService,
        ...GetDatabaseProviders(Product),
        JwtService,
    ],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
