import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { Repository } from 'typeorm';
import { AbstractService } from '@app/common';

@Injectable()
export class ProductService extends AbstractService<Product> {
    constructor(
        @InjectRepository(Product) repository: Repository<Product>,
        @InjectDataSource() dataSource,
    ) {
        super(repository, dataSource, Product);
    }
}
