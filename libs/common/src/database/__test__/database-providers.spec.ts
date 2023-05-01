import { Provider } from '@nestjs/common';
import { TableMetadataProvider } from '../providers';
import { MockUser } from './mocks/user-service.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

class MockClass {
    name: string;
    age: number;
}

const createTestingModule = async (
    model: any,
    dataSourceProvider: Provider,
) => {
    const provider = TableMetadataProvider(model);

    const module = await Test.createTestingModule({
        providers: [provider, dataSourceProvider],
    }).compile();

    return module;
};

describe('Database Providers', () => {
    describe('Metadata provider', () => {
        it('should return a metadata of entity', async () => {
            const module = async () =>
                await createTestingModule(MockUser, {
                    provide: DataSource,
                    useValue: {
                        getMetadata(model: any) {
                            return {
                                tableName: 'MOCK_USERS',
                                targetName: MockUser.name,
                            };
                        },
                    },
                });

            expect(await module()).toBeInstanceOf(TestingModule);
        });

        it('should return an error when metadata entity not found', async () => {
            const module = async () =>
                await createTestingModule(MockClass, {
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
                await createTestingModule(
                    {},
                    {
                        provide: DataSource,
                        useValue: {
                            getMetadata(model: any) {
                                return {};
                            },
                        },
                    },
                );

            expect(async () => await module()).rejects.toThrow(Error);
        });
    });
});
