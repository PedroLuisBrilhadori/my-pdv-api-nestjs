import { isArray } from 'lodash';

export function transformSortType(values: string | string[]) {
    const sorts = [];

    if (!isArray(values)) values = [values];

    for (const value of values) {
        const param = value.split(':');
        const field = param.shift();
        const order = param.shift()?.toUpperCase();

        sorts.push({ field, order });
    }

    return sorts;
}
