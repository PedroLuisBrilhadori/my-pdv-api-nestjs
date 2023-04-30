import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Searchable } from '../../decorators/search.decorator';
import { AbstractService, TableMetadata } from '../../service.abstract';
import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

export class MockCreateUserDto {
    name: string;
    email: string;
}

@Entity('MOCK_USERS')
@Searchable('name')
export class MockUser {
    @PrimaryColumn('varchar', { unique: true })
    email: string;

    @Column('varchar')
    name: string;
}

@Injectable()
export class MockUserService extends AbstractService<MockUser> {
    constructor(
        @InjectRepository(MockUser) repository,
        @InjectDataSource() dataSource,
        @Inject(TableMetadata.name) metadata,
    ) {
        super(repository, dataSource, metadata);
    }
}
