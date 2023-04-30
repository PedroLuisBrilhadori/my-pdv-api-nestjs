import { Repository } from 'typeorm';

export class MockRepository<TEntity> extends Repository<TEntity> {
    findOne = jest.fn();
    create = jest.fn();
    save = jest.fn();
    delete = jest.fn();

    createQueryBuilder = jest
        .fn()
        .mockImplementation(() => new MockQueryBuilder());
}

export class MockQueryBuilder {
    where = jest.fn();
    orderBy = jest.fn();

    take = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockImplementation(() => ({
            getManyAndCount: jest.fn(),
        })),
    }));
}
