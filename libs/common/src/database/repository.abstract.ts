import {
    ConflictException,
    HttpException,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import {
    DeepPartial,
    FindOneOptions,
    ObjectLiteral,
    Repository,
} from 'typeorm';
import { Criteria, FindOptions } from './types';

export abstract class AbstractRepository<TEntity extends ObjectLiteral> {
    name: string;
    tableName: string;
    searchName: string;

    constructor(
        private repository: Repository<TEntity>,
        name: string,
        tableName: string,
        searchName: string,
    ) {
        this.name = name;
        this.tableName = tableName;
        this.searchName = searchName;

        if (!name || name.length === 0) {
            throw new Error(`name of repository is not defined.`);
        }
        if (!tableName || tableName.length === 0) {
            throw new Error(`tableName of repository is not defined.`);
        }
        if (!searchName || searchName.length === 0) {
            throw new Error(`searchName of repository is not defined.`);
        }
    }

    async finOne(findOptions: FindOneOptions<TEntity>) {
        const entity = await this.repository.findOne(findOptions);

        if (!entity) throw new NotFoundException(`${this.name} not found.`);

        return {
            [`${this.name.toLowerCase()}`]: entity,
        };
    }

    async create(dto: DeepPartial<TEntity>) {
        const entity = this.repository.create(dto);

        try {
            await this.repository.save(entity);

            return {
                [`${this.name.toLowerCase()}`]: entity,
            };
        } catch (error) {
            console.error(error);
            throw new ConflictException(`${this.name} already exists.`);
        }
    }

    async find({ page, max, search, ...orders }: FindOptions) {
        const skip = (page - 1) * max;

        const queryBuilder = this.repository.createQueryBuilder(this.tableName);

        if (typeof skip !== 'number')
            throw new HttpException(
                `skip is not defined.`,
                HttpStatus.BAD_REQUEST,
            );

        if (search) {
            queryBuilder.where(
                `LOWER(unaccent(${this.tableName}.${this.searchName})) LIKE LOWER(unaccent(:${this.searchName}))`,
                {
                    [this.searchName]: `%${search}%`,
                },
            );
        }

        if (orders) {
            const entries = Object.entries(orders);
            const queryOrder = {};

            for (const sort of entries) {
                const field = sort.shift() as keyof TEntity as string;
                const order = sort.shift();

                if (!order || !field) continue;

                if (order !== 'desc' && order !== 'asc') continue;

                queryOrder[`${this.tableName}.${field}`] = order.toUpperCase();
            }

            queryBuilder.orderBy(queryOrder);
        }

        const [data, total] = await queryBuilder
            .take(max)
            .skip(skip)
            .getManyAndCount();

        return { data, total, page };
    }

    async delete(criteria: Criteria<TEntity>) {
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
