import { DeepPartial, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

export abstract class AbstractCreateService<TEntity> {
    constructor(private repository: Repository<TEntity>) {}

    async create(dto: DeepPartial<TEntity>) {
        const entity = this.repository.create(dto);

        try {
            const createdEntity = await this.repository.save(entity);

            return {
                data: createdEntity,
            };
        } catch (error) {
            throw new ConflictException(entity, `already exists.`);
        }
    }
}
