import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { Criteria, TableMetadata } from '@app/common/database';

import { DeleteUserService, User } from '@app/modules/user';
import { faker } from '@faker-js/faker';

describe('DeleteUserService', () => {
    let service: DeleteUserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                DeleteUserService,
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

        service = module.get<DeleteUserService>(DeleteUserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should delete a user', async () => {
        const criteria: Criteria<User> = faker.internet.email();

        const result: DeleteResult = {
            raw: 0,
            affected: 1,
        };

        jest.spyOn(repository, 'delete').mockImplementation(async () => result);

        expect(await service.delete(criteria)).toStrictEqual(result);
    });
});
