export interface FindOptions {
    page: number;
    max: number;
    search?: string;
    orders?: { [key: string]: 'DESC' | 'ASC' };
}

export type Criteria =
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectID
    | ObjectID[]
    | FindOptionsWhere<TEntity>;
