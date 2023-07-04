import { compare, hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { TableMetadata } from '@app/common/database';

import { FindOneUserService, CreateUserDto, User } from '@app/modules/user';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockuser = makeUser();

describe('FindOneUserService', () => {
    let service: FindOneUserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindOneUserService,
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

        service = module.get<FindOneUserService>(FindOneUserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should find one user', async () => {
        const { email }: User = mockuser;

        const result = {
            data: { ...mockuser, password: undefined },
        };

        jest.spyOn(repository, 'findOne').mockImplementation(async () => ({
            ...mockuser,
        }));

        expect(await service.findOne({ where: { email } })).toStrictEqual(
            result,
        );
    });
});
