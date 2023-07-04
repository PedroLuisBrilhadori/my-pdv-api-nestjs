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
    where = jest.fn().mockImplementation(() => this);
    orderBy = jest.fn().mockImplementation(() => this);
    addOrderBy = jest.fn().mockImplementation(() => this);

    update = jest.fn().mockImplementation(() => this);
    set = jest.fn().mockImplementation(() => this);
    execute = jest.fn().mockImplementation(() => this);

    take = jest.fn().mockImplementation(() => this);
    skip = jest.fn().mockImplementation(() => this);
    getManyAndCount = jest.fn(async () => {});
}
