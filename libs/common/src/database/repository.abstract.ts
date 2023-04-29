import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    DeepPartial,
    FindOneOptions,
    ObjectLiteral,
    Repository,
} from 'typeorm';
import { Criteria, FindOptions } from './types';

@Injectable()
export abstract class AbstractRepository<TEntity extends ObjectLiteral> {
    name: string;
    tableName: string;

    constructor(private repository: Repository<TEntity>) {
        if (!this.name || this.name.length === 0) {
            throw new Error(`name of repository is not defined.`);
        }
        if (!this.tableName || this.tableName.length === 0) {
            throw new Error(`tableName of repository is not defined.`);
        }
    }

    async finOne(findOptions: FindOneOptions<TEntity>) {
        const entity = await this.repository.findOne(findOptions);

        if (!entity) throw new NotFoundException(`${this.name} not found.`);

        return entity;
    }

    async create(dto: DeepPartial<TEntity>) {
        const entity = this.repository.create(dto);

        try {
            await this.repository.save(entity);

            return entity;
        } catch (error) {
            console.error(error);
            throw new ConflictException(`${this.name} already exists.`);
        }
    }

    async find(options: FindOptions) {
        const skip = (options.page - 1) * options.max;
        const queryBuider = this.repository.createQueryBuilder();

        if (options.search) {
            queryBuider.where(
                `LOWER(unaccent(${this.tableName})) LIKE LOWER(unnacent(:name))`,
                {
                    name: `%${options.search}%`,
                },
            );
        }

        if (options.orders) {
            const entries = Object.entries(options.orders);
            const queryOrder = {};

            for (const sort of entries) {
                const field = sort.shift() as keyof TEntity;
                const order = sort.shift();

                if (!order || !field) continue;

                if (order !== 'DESC' && order !== 'ASC') continue;

                queryOrder[`${this.tableName}.${field as string}`] = order;
            }

            queryBuider.orderBy(queryOrder);
        }

        const [data, total] = await queryBuider
            .take(options.max)
            .skip(skip)
            .getManyAndCount();

        return { data, total, page: options.page };
    }

    async delete(criteria: Criteria) {
        try {
            return await this.repository.delete(criteria);
        } catch (error) {
            throw new HttpException(
                `${this.name} não deletado`,
                HttpStatus.NOT_MODIFIED,
            );
        }
    }
}
