import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractDeleteRepository } from '@app/common';
import { Product } from '../model/product.model';

@Injectable()
export class DeleteProductService extends AbstractDeleteRepository<Product> {
    constructor(@InjectRepository(Product) repository: Repository<Product>) {
        super(repository);
    }
}
