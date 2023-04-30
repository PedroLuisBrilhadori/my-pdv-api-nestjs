import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import {
    QueryBuilder,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import {
    AbstractService,
    TableMetadata,
    QueryRunnerProvider,
} from '@app/common';

@Injectable()
export class ProductService extends AbstractService<Product> {
    constructor(
        @InjectRepository(Product) repository: Repository<Product>,
        @Inject(QueryBuilder.name) queryBuilder: SelectQueryBuilder<Product>,
        @Inject(QueryRunnerProvider.name) queryRunner: QueryRunner,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(repository, queryBuilder, queryRunner, tableMetadata);
    }
}
