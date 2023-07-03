import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AbstractFindOneService, TableMetadata } from '@app/common';
import { User } from '../model/user.model';

@Injectable()
export class FindOneUserService extends AbstractFindOneService<User> {
    constructor(
        @InjectRepository(User) repository: Repository<User>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
    ) {
        super(repository, tableMetadata);
    }

    async findOne(dto: FindOneOptions<User>) {
        const { data } = await super.findOne(dto);

        return {
            data: {
                ...data,
                password: undefined,
            },
        };
    }
}
