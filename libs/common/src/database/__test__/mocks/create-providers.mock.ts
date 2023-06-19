import { FactoryProvider, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MockQueryBuilder } from './repository.mock';
import { MockQueryRunner } from './datasource.mock';

export const createTestingModule = async (
    provider: FactoryProvider [],
    dataSourceProvider: Provider,
) => {
    const module = await Test.createTestingModule({
        providers: [...provider, dataSourceProvider],
    }).compile();

    return module;
};

export class MockClass {
    name: string;
    age: number;
}

export const mockDataSource = {
    getMetadata(model: any) {
        return {
            tableName: 'MOCK_USERS',
            targetName: model.name,
        };
    },
    createQueryBuilder(model: any, alias: string) {
        return new MockQueryBuilder();
    },
    createQueryRunner() {
        return new MockQueryRunner();
    },
};