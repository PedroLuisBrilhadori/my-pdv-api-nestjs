// import {
//     Column,
//     Entity,
//     PrimaryColumn,
//     QueryBuilder,
//     QueryRunner,
//     Repository,
//     SelectQueryBuilder,
// } from 'typeorm';
// import { Searchable } from '../../decorators/search.decorator';
// import { TableMetadata } from '../../types';
// import { Inject, Injectable } from '@nestjs/common';

// export class MockCreateUserDto {
//     name: string;
//     email: string;
// }

// @Entity('MOCK_USERS')
// @Searchable('name')
// export class MockUser {
//     @PrimaryColumn('varchar', { unique: true })
//     email: string;

//     @Column('varchar')
//     name: string;
// }

// @Injectable()
// export class MockUserService extends AbstractService<MockUser> {
//     constructor(
//         @InjectRepository(MockUser) repository: Repository<MockUser>,
//         @Inject(QueryBuilder.name) queryBuilder: SelectQueryBuilder<MockUser>,
//         @Inject(QueryRunnerProvider.name) queryRunner: QueryRunner,
//         @Inject(TableMetadata.name) metadata: TableMetadata,
//     ) {
//         super(repository, queryBuilder, queryRunner, metadata);
//     }
// }
