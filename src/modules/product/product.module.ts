import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDatabaseProviders } from '@app/common';
import {
    CreateProductController,
    DeleteProductController,
    FindOneProductController,
    FindProductController,
} from './controllers';
import {
    CreateProductService,
    DeleteProductService,
    FindOneProductService,
    FindProductService,
} from './services';
import { Product } from './model/product.model';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [
        CreateProductController,
        FindProductController,
        FindOneProductController,
        DeleteProductController,
    ],
    providers: [
        CreateProductService,
        FindOneProductService,
        FindProductService,
        DeleteProductService,
        ...GetDatabaseProviders(Product),
        JwtService,
    ],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
