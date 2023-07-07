import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractCreateService } from '@app/common';

import { Product } from '../model/product.model';

@Injectable()
export class CreateProductService extends AbstractCreateService<Product> {
    constructor(@InjectRepository(Product) repository: Repository<Product>) {
        super(repository);
    }
}
