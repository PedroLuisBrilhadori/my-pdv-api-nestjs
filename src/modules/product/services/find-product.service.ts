import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, QueryRunner, SelectQueryBuilder } from 'typeorm';
import {
    AbstractFindRepository,
    QueryRunnerProvider,
    TableMetadata,
} from '@app/common';
import { Product } from '../model/product.model';

@Injectable()
export class FindProductService extends AbstractFindRepository<Product> {
    constructor(
        @Inject(QueryRunnerProvider.name) queryRunner: QueryRunner,
        @Inject(QueryBuilder.name) queryBuilder: SelectQueryBuilder<Product>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(queryBuilder, queryRunner, tableMetadata);
    }
}
