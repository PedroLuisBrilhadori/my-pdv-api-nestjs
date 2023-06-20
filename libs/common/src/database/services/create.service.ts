import { DeepPartial, Repository } from 'typeorm';
import { TableMetadata } from '../types';
import { ConflictException } from '@nestjs/common';

export abstract class AbstractCreateService<TEntity> {
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

    async create(dto: DeepPartial<TEntity>) {
        const entity = this.repository.create(dto);

        try {
            const createdEntity = await this.repository.save(entity);

            return {
                [`${this.name.toLowerCase()}`]: createdEntity,
            };
        } catch (error) {
            throw new ConflictException(`${this.name} already exists.`);
        }
    }
}
