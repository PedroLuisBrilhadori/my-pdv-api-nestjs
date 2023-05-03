import { FindOptionsWhere, ObjectID } from 'typeorm';

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
