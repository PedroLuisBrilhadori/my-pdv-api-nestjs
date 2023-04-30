import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { GetDatabaseProviders } from '@app/common';

@Module({
    controllers: [ProductController],
    providers: [ProductService, ...GetDatabaseProviders(Product)],
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [],
})
export class ProductModule {}
