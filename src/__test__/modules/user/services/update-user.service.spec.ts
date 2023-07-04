import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';

import {
    UpdateUserService,
    CreateUserDto,
    User,
    UpdateUserDto,
    FindOneUserService,
} from '@app/modules/user';
import { TableMetadata } from '@app/common/database';
import { Repository } from 'typeorm';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockuser = makeUser();

describe('UpdateUserService', () => {
    let service: UpdateUserService;
    let repository: Repository<User>;
    let findOneService: FindOneUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateUserService,
                FindOneUserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockRepository<User>,
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'User',
                        tableName: 'User',
                        searchName: 'email',
                    },
                },
            ],
        }).compile();

        service = module.get<UpdateUserService>(UpdateUserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
        findOneService = module.get<FindOneUserService>(FindOneUserService);
    });

    it('should update an user', async () => {
        const dto: UpdateUserDto = mockuser;

        const result = {
            data: mockuser,
        };

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: {
                ...mockuser,
            },
        }));

        expect(await service.update(mockuser.email, dto)).toStrictEqual(result);
    });

    it('should throw erro when bad user update', async () => {
        const dto: UpdateUserDto = mockuser;

        jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => {
            throw new Error();
        });

        expect(
            async () => await service.update(mockuser.email, dto),
        ).rejects.toThrow(Error);
    });
});
