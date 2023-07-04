import { compare, hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { TableMetadata } from '@app/common/database';

import {
    FindUserPasswordService,
    CreateUserDto,
    User,
} from '@app/modules/user';
import { UnauthorizedException } from '@nestjs/common';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockuser = makeUser();

describe('FindUserPasswordService', () => {
    let service: FindUserPasswordService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindUserPasswordService,
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
                    useValue: {
                        hash: hash,
                        compare: (pass: string, pass1: string) =>
                            pass !== '' && pass1 !== '',
                    },
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<FindUserPasswordService>(FindUserPasswordService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should find password user', async () => {
        const { email, password }: User = mockuser;

        const result = mockuser;

        jest.spyOn(repository, 'findOne').mockImplementation(async () => ({
            ...mockuser,
        }));

        expect(await service.findPassword(email, password)).toStrictEqual(
            result,
        );
    });

    it('should return an error when find user without password', async () => {
        const { email }: User = mockuser;

        jest.spyOn(repository, 'findOne').mockImplementation(
            async () => mockuser,
        );

        expect(
            async () => await service.findPassword(email, ''),
        ).rejects.toThrow(UnauthorizedException);
    });
});
