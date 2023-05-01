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
import { Criteria, FindOptions, SortParam } from './model/database.model';
import { isArray } from 'lodash';

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

    async find({ page, max, search, sort }: FindOptions) {
        const skip = (page - 1) * max;

        if (search && this.searchName) this.addSearch(search);

        if (sort) {
            if (!isArray(sort)) sort = [sort];
            await this.addOrders(sort);
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

    private addSearch(search: string) {
        this.queryBuilder.where(
            `LOWER(unaccent(${this.tableName}.${this.searchName})) LIKE LOWER(unaccent(:${this.searchName}))`,
            {
                [this.searchName]: `%${search}%`,
            },
        );
    }

    private async addOrders(sorts: SortParam[]) {
        for (const { order, field } of sorts) {
            const hasColumn = await this.queryRunner.hasColumn(
                this.tableName,
                field,
            );

            if (!hasColumn)
                throw new BadRequestException(
                    `field: ${field} does exists in ${this.name}`,
                );

            this.queryBuilder.addOrderBy(field, order);
        }
    }
}
