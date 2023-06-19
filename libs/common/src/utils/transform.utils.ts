import { isArray } from 'lodash';
import { SortParam } from '../database';

export function transformSortType(values: string | string[]) {
    const sorts: SortParam[] = [];

    if (!isArray(values)) values = [values as string];

    for (const value of values) {
        const param = value.split(':');
        const field = param.shift();
        const order = param.shift()?.toUpperCase() as 'ASC' | 'DESC';

        sorts.push({ field, order });
    }

    return sorts;
}
