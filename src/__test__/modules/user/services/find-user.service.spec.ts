import { compare, hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QueryBuilder, SelectQueryBuilder } from 'typeorm';
import {
    MockQueryBuilder,
    MockQueryRunner,
} from '@app/common/database/__test__/mocks';
import {
    FindOptionsDto,
    QueryRunnerProvider,
    TableMetadata,
} from '@app/common/database';

import { FindUserService, CreateUserDto, User } from '@app/modules/user';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockUsers = [makeUser(), makeUser(), makeUser(), makeUser(), makeUser()];

describe('FindUserService', () => {
    let service: FindUserService;
    let queryBuilder: SelectQueryBuilder<User>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindUserService,
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
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<FindUserService>(FindUserService);
        queryBuilder = module.get<SelectQueryBuilder<User>>(QueryBuilder.name);
    });

    it('should find users', async () => {
        const findOptions: FindOptionsDto = {
            page: 1,
            max: 5,
        };

        const result = {
            page: findOptions.page,
            data: mockUsers
                .slice(0, 4)
                .map((user) => ({ ...user, password: undefined })),
            total: mockUsers.length,
        };

        jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
            async () => [mockUsers.slice(0, 4), mockUsers.length],
        );

        expect(await service.find(findOptions)).toStrictEqual(result);
    });
});
