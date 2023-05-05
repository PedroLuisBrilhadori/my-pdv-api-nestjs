import { NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { TableMetadata } from '../types';

export abstract class AbstractFindOneRepository<TEntity> {
    name: string;
    tableName: string;
    searchName: string;

    constructor(
        private repository: Repository<TEntity>,
        metadata: TableMetadata,
    ) {
        this.name = metadata.name;
        this.tableName = metadata.tableName;
        this.searchName = metadata.searchName;
    }

    async findOne(FindOptionsDto: FindOneOptions<TEntity>) {
        const entity = await this.repository.findOne(FindOptionsDto);

        if (!entity) throw new NotFoundException(`${this.name} not found.`);

        return {
            [`${this.name.toLowerCase()}`]: entity,
        };
    }
}
