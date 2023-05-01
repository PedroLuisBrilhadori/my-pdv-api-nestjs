import { FactoryProvider, Provider } from '@nestjs/common';
import {
    GetDatabaseProviders,
    QueryBuilderProvider,
    QueryRunnerProvider,
    TableMetadataProvider,
} from '../providers';
import { MockUser } from './mocks/user-service.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, QueryBuilder } from 'typeorm';
import { MockQueryBuilder } from './mocks/repository.mock';
import { MockQueryRunner } from './mocks/datasource.mock';

class MockClass {
    name: string;
    age: number;
}

const createTestingModule = async (
    provider: FactoryProvider[],
    dataSourceProvider: Provider,
) => {
    const module = await Test.createTestingModule({
        providers: [...provider, dataSourceProvider],
    }).compile();

    return module;
};

const mockDataSource = {
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

describe('Database Providers', () => {
    describe('Metadata provider', () => {
        it('should return a metadata of entity', async () => {
            const module = async () =>
                await createTestingModule([TableMetadataProvider(MockUser)], {
                    provide: DataSource,
                    useValue: mockDataSource,
                });

            expect(await module()).toBeInstanceOf(TestingModule);
        });

        it('should return an error when metadata entity not found', async () => {
            const module = async () =>
                await createTestingModule([TableMetadataProvider(MockClass)], {
                    provide: DataSource,
                    useValue: {
                        getMetadata(model: any) {
                            return {};
                        },
                    },
                });

            expect(async () => await module()).rejects.toThrow(Error);
        });

        it('should return an error when class not found', async () => {
            const module = async () =>
                await createTestingModule([TableMetadataProvider({})], {
                    provide: DataSource,
                    useValue: mockDataSource,
                });

            expect(async () => await module()).rejects.toThrow(Error);
        });
    });

    describe('QueryBuilder Provider', () => {
        it('should return a querybuilder instance', async () => {
            const module = async () =>
                createTestingModule([QueryBuilderProvider(MockUser)], {
                    provide: DataSource,
                    useValue: mockDataSource,
                });

            expect(await module()).toBeInstanceOf(TestingModule);
        });
    });

    describe('QueryRunner Provider', () => {
        it('should return a queryrunner instance', async () => {
            const module = async () =>
                createTestingModule([QueryRunnerProvider()], {
                    provide: DataSource,
                    useValue: mockDataSource,
                });

            expect(await module()).toBeInstanceOf(TestingModule);
        });
    });

    describe('GetDatabaseProviders', () => {
        it('should return all providers to database', async () => {
            const module = async () =>
                createTestingModule(GetDatabaseProviders(MockUser), {
                    provide: DataSource,
                    useValue: mockDataSource,
                });

            expect(await module()).toBeInstanceOf(TestingModule);
        });
    });
});
