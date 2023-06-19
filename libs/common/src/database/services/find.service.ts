import { BadRequestException } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { isArray } from 'class-validator';
import { SortParam, TableMetadata } from '../types';
import { FindOptionsDto } from '../dto';

export abstract class AbstractFindService<TEntity> {
    name: string;
    tableName: string;
    searchName: string;

    constructor(
        private queryBuilder: SelectQueryBuilder<TEntity>,
        private queryRunner: QueryRunner,
        metadata: TableMetadata,
    ) {
        this.name = metadata.name;
        this.tableName = metadata.tableName;
        this.searchName = metadata.searchName;
    }

    async find({ page, max, search, sort }: FindOptionsDto) {
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
