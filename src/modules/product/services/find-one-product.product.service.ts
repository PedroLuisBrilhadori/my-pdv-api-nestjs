import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractFindOneService, TableMetadata } from '@app/common';
import { Product } from '../model/product.model';

@Injectable()
export class FindOneProductService extends AbstractFindOneService<Product> {
    constructor(
        @InjectRepository(Product) repository: Repository<Product>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(repository, tableMetadata);
    }
}
