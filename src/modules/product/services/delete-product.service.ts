import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractDeleteService } from '@app/common';
import { Product } from '../model/product.model';

@Injectable()
export class DeleteProductService extends AbstractDeleteService<Product> {
    constructor(@InjectRepository(Product) repository: Repository<Product>) {
        super(repository);
    }
}
