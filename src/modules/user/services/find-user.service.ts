import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, QueryRunner, SelectQueryBuilder } from 'typeorm';
import {
    AbstractFindService,
    FindOptionsDto,
    QueryRunnerProvider,
    TableMetadata,
} from '@app/common';
import { User } from '../model/user.model';

@Injectable()
export class FindUserService extends AbstractFindService<User> {
    constructor(
        @Inject(QueryRunnerProvider.name) queryRunner: QueryRunner,
        @Inject(QueryBuilder.name) queryBuilder: SelectQueryBuilder<User>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(queryBuilder, queryRunner, tableMetadata);
    }

    async find(dto: FindOptionsDto) {
        const users = await super.find(dto);

        users.data = users.data.map((user) => ({
            ...user,
            password: undefined,
        }));

        return users;
    }
}
