import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { TableMetadata } from '../../types';
import {
    MockFindOneUserService,
    MockRepository,
    MockUser,
    createUser,
} from '../mocks';

const mockuser: MockUser = createUser();

describe('Abstract FindOne Service', () => {
    let service: MockFindOneUserService;
    let repository: Repository<MockUser>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockFindOneUserService,
                {
                    provide: getRepositoryToken(MockUser),
                    useClass: MockRepository<MockUser>,
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

        service = module.get<MockFindOneUserService>(MockFindOneUserService);
        repository = module.get<Repository<MockUser>>(
            getRepositoryToken(MockUser),
        );
    });

    it('should find one user', async () => {
        const findOptions: FindOneOptions<MockUser> = {
            where: { name: 'Pedro' },
        };

        const result = {
            data: mockuser,
        };

        jest.spyOn(repository, 'findOne').mockImplementation(async () => ({
            ...mockuser,
        }));

        expect(await service.findOne(findOptions)).toStrictEqual(result);
    });

    it('should throw a not found error', async () => {
        const findOptions: FindOneOptions<MockUser> = {
            where: { name: 'Carlos' },
        };

        jest.spyOn(repository, 'findOne').mockImplementation(() => null);

        expect(async () => await service.findOne(findOptions)).rejects.toThrow(
            NotFoundException,
        );
    });
});
