import { Test } from '@nestjs/testing';
import {
    MockQueryRunner,
    dataSourceMockFactory,
} from './mocks/datasource.mock';
import { MockQueryBuilder, MockRepository } from './mocks/repository.mock';
import {
    MockCreateUserDto,
    MockUser,
    MockUserService,
} from './mocks/user-service.mock';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import {
    DataSource,
    DeleteResult,
    FindOneOptions,
    QueryBuilder,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import { TableMetadata } from '../service.abstract';
import {
    BadRequestException,
    ConflictException,
    HttpException,
    NotFoundException,
} from '@nestjs/common';
import { Criteria, FindOptions } from '../types/database.types';
import { QueryBuilderProvider, QueryRunnerProvider } from '../providers';

const mockuser: MockUser = {
    name: 'Pedro',
    email: 'pedro@example.co',
};

const mockUsers: MockUser[] = [
    mockuser,
    { name: 'Elle', email: 'elle@example.co' },
    { name: 'Kyle', email: 'kyle@example.co' },
    { name: 'Carlos', email: 'carlos@example.co' },
    { name: 'Jefferson', email: 'jefferson@example.co' },
    { name: 'Michel', email: 'michel@example.co' },
];

describe('Abstract Repository', () => {
    let service: MockUserService;
    let repository: Repository<MockUser>;
    let queryRunner: QueryRunner;
    let queryBuilder: SelectQueryBuilder<MockUser>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockUserService,
                {
                    provide: getRepositoryToken(MockUser),
                    useClass: MockRepository<MockUser>,
                },
                {
                    provide: QueryBuilder.name,
                    useClass: MockQueryBuilder,
                },
                {
                    provide: QueryRunnerProvider.name,
                    useClass: MockQueryRunner,
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'MockUser',
                        tableName: 'MOCK_USERS',
                        searchName: 'name',
                    },
                },
            ],
        }).compile();

        service = module.get<MockUserService>(MockUserService);
        repository = module.get<Repository<MockUser>>(
            getRepositoryToken(MockUser),
        );
        queryRunner = module.get<QueryRunner>(QueryRunnerProvider.name);
        queryBuilder = module.get<SelectQueryBuilder<MockUser>>(
            QueryBuilder.name,
        );
    });

    it('should to be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a mock user', async () => {
            const userDto: MockCreateUserDto = mockuser;

            const result = {
                mockuser,
            };

            jest.spyOn(repository, 'create').mockImplementation(() => userDto);

            jest.spyOn(repository, 'save');

            expect(await service.create(userDto)).toStrictEqual(result);
        });

        it('should throw an error when create already user', async () => {
            const userDto: MockCreateUserDto = {
                name: 'Pedro',
                email: 'pedro@example.co',
            };

            jest.spyOn(repository, 'create').mockImplementation(() => userDto);

            jest.spyOn(repository, 'save').mockImplementation(() => {
                throw new Error('');
            });

            expect(async () => await service.create(userDto)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('findOne', () => {
        it('should find one user', async () => {
            const findOptions: FindOneOptions<MockUser> = {
                where: { name: 'Pedro' },
            };

            const result = {
                mockuser,
            };

            jest.spyOn(repository, 'findOne').mockImplementation(async () => ({
                ...mockuser,
            }));

            expect(await service.finOne(findOptions)).toStrictEqual(result);
        });

        it('should throw a not found error', async () => {
            const findOptions: FindOneOptions<MockUser> = {
                where: { name: 'Carlos' },
            };

            jest.spyOn(repository, 'findOne').mockImplementation(() => null);

            expect(
                async () => await service.finOne(findOptions),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            const criteria: Criteria<MockUser> = mockuser.email;

            const result: DeleteResult = {
                raw: mockuser,
                affected: 1,
            };

            jest.spyOn(repository, 'delete').mockImplementation(
                async () => result,
            );

            expect(await service.delete(criteria)).toStrictEqual(result);
        });

        it('should throw an Error when database error happens.', async () => {
            const criteria: Criteria<MockUser> = mockuser.email;

            jest.spyOn(repository, 'delete').mockImplementation(async () => {
                throw new Error();
            });

            expect(async () => await service.delete(criteria)).rejects.toThrow(
                HttpException,
            );
        });
    });

    describe('find', () => {
        it('should find all users with pagination and max 5 users', async () => {
            const findOptions: FindOptions = {
                page: 1,
                max: 5,
            };

            const result = {
                page: findOptions.page,
                data: mockUsers.slice(0, 4),
                total: mockUsers.length,
            };

            jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
                async () => [mockUsers.slice(0, 4), mockUsers.length],
            );

            expect(await service.find(findOptions)).toStrictEqual(result);
        });

        it('should find all users with "le" like ', async () => {
            const findOptions: FindOptions = {
                page: 1,
                max: 5,
                search: 'le',
            };

            const users = mockUsers.slice(1, 3);

            const result = {
                page: findOptions.page,
                data: users,
                total: users.length,
            };

            jest.spyOn(queryBuilder, 'where').mockImplementation();

            jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
                async () => [users, users.length],
            );

            expect(await service.find(findOptions)).toStrictEqual(result);
        });

        it('should find all users with "aaaa" like ', async () => {
            const findOptions: FindOptions = {
                page: 1,
                max: 5,
                search: 'aaaa',
            };

            const users = [];

            const result = {
                page: findOptions.page,
                data: users,
                total: users.length,
            };

            jest.spyOn(queryBuilder, 'where').mockImplementation();

            jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
                async () => [users, users.length],
            );

            expect(await service.find(findOptions)).toStrictEqual(result);
        });

        it('should find all users with name sort asc', async () => {
            const findOptions: FindOptions = {
                page: 1,
                max: 5,
                sort: { field: 'name', order: 'ASC' },
            };

            const users = mockUsers;

            const result = {
                page: findOptions.page,
                data: users,
                total: users.length,
            };

            jest.spyOn(queryRunner, 'hasColumn').mockImplementation(
                async () => true,
            );

            jest.spyOn(queryBuilder, 'addOrderBy');

            jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
                async () => [users, users.length],
            );

            expect(await service.find(findOptions)).toStrictEqual(result);
        });

        it('should throw an error when users with age sort asc (age does exists in MockUsers)', async () => {
            const findOptions: FindOptions = {
                page: 1,
                max: 5,
                sort: { field: 'age', order: 'ASC' },
            };

            const users = mockUsers;

            const result = {
                page: findOptions.page,
                data: users,
                total: users.length,
            };

            jest.spyOn(queryRunner, 'hasColumn').mockImplementation(
                async () => false,
            );

            expect(async () => await service.find(findOptions)).rejects.toThrow(
                BadRequestException,
            );
        });
    });
});
