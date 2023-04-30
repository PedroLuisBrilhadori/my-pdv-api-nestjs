import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { TableMetadataProvider } from '@app/common';

@Module({
    controllers: [ProductController],
    providers: [ProductService, TableMetadataProvider(Product)],
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [],
})
export class ProductModule {}
