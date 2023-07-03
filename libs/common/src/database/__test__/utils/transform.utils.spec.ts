import { transformSortType } from '@app/common/utils';

describe('transformSortType', () => {
    it('should transform one type', () => {
        const field = 'name';
        const order = 'DESC';
        const type = `${field}:${order}`;

        const sort = transformSortType(type)[0];

        expect(sort.field).toBe(field);
        expect(sort.order).toBe(order);
    });
});
