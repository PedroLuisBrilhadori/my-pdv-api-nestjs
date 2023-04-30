import 'reflect-metadata';
import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import {
    DeepPartial,
    FindOneOptions,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import { Criteria, FindOptions } from './types/types';

export class TableMetadata {
    name: string;
    tableName: string;
    searchName: string;
}

export abstract class AbstractService<TEntity> {
    name: string;
    tableName: string;
    searchName: string;

    constructor(
        private repository: Repository<TEntity>,
        private queryBuilder: SelectQueryBuilder<TEntity>,
        private queryRunner: QueryRunner,
        metadata: TableMetadata,
    ) {
        this.name = metadata.name;
        this.tableName = metadata.tableName;
        this.searchName = metadata.searchName;
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
            throw new ConflictException(`${this.name} already exists.`);
        }
    }

    async find({ page, max, search, ...orders }: FindOptions) {
        const skip = (page - 1) * max;

        if (typeof page !== 'number' || typeof max !== 'number') {
            const param = typeof page !== 'number' ? 'page' : 'max';

            throw new BadRequestException(
                `the param: ${param} is not defined.`,
            );
        }

        if (search && this.searchName) {
            this.queryBuilder.where(
                `LOWER(unaccent(${this.tableName}.${this.searchName})) LIKE LOWER(unaccent(:${this.searchName}))`,
                {
                    [this.searchName]: `%${search}%`,
                },
            );
        }

        const entries = Object.entries(orders);

        if (entries.length > 0) {
            const queryOrder = {};

            for (const sort of entries) {
                const field = sort.shift() as keyof TEntity as string;
                const order = sort.shift();

                if (!order || !field) continue;

                if (order !== 'desc' && order !== 'asc') continue;

                if (await this.queryRunner.hasColumn(this.tableName, field))
                    queryOrder[`${this.tableName}.${field}`] =
                        order.toUpperCase();
            }

            this.queryBuilder.orderBy(queryOrder);
        }

        const [data, total] = await this.queryBuilder
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
                `${criteria} is not deleted.`,
                HttpStatus.NOT_MODIFIED,
            );
        }
    }
}
