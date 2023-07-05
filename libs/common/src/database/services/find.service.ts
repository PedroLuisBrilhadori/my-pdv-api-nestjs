import { BadRequestException } from '@nestjs/common';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { isArray } from 'class-validator';
import { SortParam, TableMetadata } from '../types';
import { FindOptionsDto } from '../dto';

export abstract class AbstractFindService<TEntity> {
    name: string;
    tableName: string;
    searchName: string;

    private where: boolean = false;

    constructor(
        private queryBuilder: SelectQueryBuilder<TEntity>,
        private queryRunner: QueryRunner,
        metadata: TableMetadata,
    ) {
        this.name = metadata.name;
        this.tableName = metadata.tableName;
        this.searchName = metadata.searchName;
    }

    async find({ page, max, search, sort, active }: FindOptionsDto) {
        const skip = (page - 1) * max;

        if (search && this.searchName) this.addSearch(search, active);

        if (sort) {
            if (!isArray(sort)) sort = [sort];
            await this.addOrders(sort);
        }

        if (!this.where) this.addActiveWhere(active);

        const [data, total] = await this.queryBuilder
            .take(max)
            .skip(skip)
            .getManyAndCount();

        return { data, total, page };
    }

    private addSearch(search: string, active: boolean) {
        console.log(search, active);
        const searchQuery = `LOWER(unaccent(${this.tableName}.${this.searchName})) LIKE LOWER(unaccent(:${this.searchName}))`;

        if (active === undefined) return this._search(searchQuery, search);

        this.where = true;

        this.queryBuilder.where(
            `${searchQuery} AND ${this.tableName}.active = :active`,
            {
                [this.searchName]: `%${search}%`,
                active,
            },
        );
    }

    private addActiveWhere(active) {
        if (!active) return;

        this.queryBuilder.where(`${this.tableName}.active = :active`, {
            active,
        });
    }

    private _search(searchQuery, search: string) {
        this.queryBuilder.where(searchQuery, {
            [this.searchName]: `%${search}%`,
        });
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
