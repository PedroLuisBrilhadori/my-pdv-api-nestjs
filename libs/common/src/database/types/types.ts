import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { transformSortType } from './transform';

export class FindOptions {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    max: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => {
        return transformSortType(value);
    })
    sort?: SortParam[] | SortParam;
}

export class SortParam {
    field: string;

    order: 'ASC' | 'DESC';
}

export type Criteria<TEntity> =
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectID
    | ObjectID[]
    | FindOptionsWhere<TEntity>;
