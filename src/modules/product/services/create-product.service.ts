import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractCreateService, TableMetadata } from '@app/common';

import { Product } from '../model/product.model';

@Injectable()
export class CreateProductService extends AbstractCreateService<Product> {
    constructor(
        @InjectRepository(Product) repository: Repository<Product>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(repository, tableMetadata);
    }
}
