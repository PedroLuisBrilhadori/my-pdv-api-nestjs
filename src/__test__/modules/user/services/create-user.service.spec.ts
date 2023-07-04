import { compare, hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { TableMetadata } from '@app/common/database';

import { CreateUserService, CreateUserDto, User } from '@app/modules/user';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockuser = makeUser();

describe('CreateUserService', () => {
    let service: CreateUserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateUserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockRepository<User>,
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'User',
                        tableName: 'User',
                        searchName: 'email',
                    },
                },
                {
                    provide: 'BCRYPT',
                    useValue: { hash: hash, compare: compare },
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should create a mock user', async () => {
        const userDto: User = mockuser;

        const result = {
            user: mockuser,
        };

        jest.spyOn(repository, 'create').mockImplementation(() => userDto);

        jest.spyOn(repository, 'save').mockImplementation(async () => userDto);

        expect(await service.createUser(userDto)).toStrictEqual(result);
    });
});
