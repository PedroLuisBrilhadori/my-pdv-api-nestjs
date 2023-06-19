import {
    Column,
    Entity,
    PrimaryColumn,
    QueryBuilder,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import { faker } from '@faker-js/faker';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { AbstractCreateService, AbstractDeleteService, AbstractFindOneService, AbstractFindService } from '../../services';
import { Searchable } from '../../decorators/search.decorator';
import { TableMetadata } from '../../types';
import { QueryRunnerProvider } from '../../providers';

export class MockCreateUserDto {
    name: string;
    email: string;
}

export const createUser = (): MockUser => ({
    name: faker.person.fullName(),
    email: faker.internet.email()
})

@Entity('MOCK_USERS')
@Searchable('name')
export class MockUser {
    @PrimaryColumn('varchar', { unique: true })
    email: string;

    @Column('varchar')
    name: string;
}

@Injectable()
export class MockCreateUserService extends AbstractCreateService<MockUser> {
    constructor(
        @InjectRepository(MockUser) repository: Repository<MockUser>,
        @Inject(TableMetadata.name) metadata: TableMetadata,
    ) {
        super(repository, metadata);
    }
}

@Injectable()
export class MockFindOneUserService extends AbstractFindOneService<MockUser>{
    constructor(
        @InjectRepository(MockUser) repository: Repository<MockUser>,
        @Inject(TableMetadata.name) metadata: TableMetadata,
    ) {
        super(repository, metadata);
    }
}

@Injectable()
export class MockFindUserService extends AbstractFindService<MockUser>{
    constructor(
        @Inject(QueryBuilder.name) queryBuilder: SelectQueryBuilder<MockUser>,
        @Inject(QueryRunnerProvider.name) queryRunner: QueryRunner,
        @Inject(TableMetadata.name) metadata: TableMetadata,
    ) {
        super(queryBuilder, queryRunner, metadata);
    }
}


@Injectable()
export class MockDeleteUserService extends AbstractDeleteService<MockUser> {
    constructor(
        @InjectRepository(MockUser) repository: Repository<MockUser>,
    ) {
        super(repository);
    }
}
