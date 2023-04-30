import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

@Injectable()
export class ProductService extends AbstractRepository<Product> {
    constructor(@InjectRepository(Product) repository: Repository<Product>) {
        super(repository, 'Product', 'PDV_PRODUCTS', 'name');
    }
}
