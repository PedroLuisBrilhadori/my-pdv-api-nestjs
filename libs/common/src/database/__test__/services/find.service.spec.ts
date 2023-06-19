import { QueryBuilder, QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
import { MockFindUserService, MockQueryBuilder, MockQueryRunner, MockUser } from "../mocks";
import { Test } from "@nestjs/testing";
import { QueryRunnerProvider } from "../../providers";
import { TableMetadata } from "../../types";
import { FindOptionsDto } from "../../dto";
import { BadRequestException } from "@nestjs/common";

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

describe('Abstract Find Service', () => {
    let service: MockFindUserService;
    let repository: Repository<MockUser>;
    let queryRunner: QueryRunner;
    let queryBuilder: SelectQueryBuilder<MockUser>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockFindUserService,
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

        service = module.get<MockFindUserService>(MockFindUserService);
        queryRunner = module.get<QueryRunner>(QueryRunnerProvider.name);
        queryBuilder = module.get<SelectQueryBuilder<MockUser>>(
            QueryBuilder.name,
        );
    });

    it('should find all users with pagination and max 5 users', async () => {
        const findOptions: FindOptionsDto = {
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
        const findOptions: FindOptionsDto = {
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
        const findOptions: FindOptionsDto = {
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
        const findOptions: FindOptionsDto = {
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
        const findOptions: FindOptionsDto = {
            page: 1,
            max: 5,
            sort: { field: 'age', order: 'ASC' },
        };


        jest.spyOn(queryRunner, 'hasColumn').mockImplementation(
            async () => false,
        );

        expect(async () => await service.find(findOptions)).rejects.toThrow(
            BadRequestException,
        );
    });
});