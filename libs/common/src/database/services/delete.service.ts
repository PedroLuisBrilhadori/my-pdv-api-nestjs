import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Criteria } from '../types';

export abstract class AbstractDeleteService<TEntity> {
    constructor(private repository: Repository<TEntity>) {}

    async delete(criteria: Criteria<TEntity>) {
        try {
            return await this.repository.delete(criteria);
        } catch (error) {
            throw new HttpException(
                `${criteria} is not deleted.`,
                HttpStatus.NOT_MODIFIED,
            );
        }
    }
}
