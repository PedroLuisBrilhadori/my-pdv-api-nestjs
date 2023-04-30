import { Test } from '@nestjs/testing';
import { dataSourceMockFactory } from './mocks/datasource.mock';
import { MockRepository } from './mocks/repository.mock';
import {
    MockCreateUserDto,
    MockUser,
    MockUserService,
} from './mocks/user-service.mock';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { TableMetadata } from '../service.abstract';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockuser = {
    name: 'Pedro',
    email: 'pedro@example.co',
};

describe('Abstract Repository', () => {
    let service: MockUserService;
    let repository: Repository<MockUser>;
    let dataSource: DataSource;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockUserService,
                {
                    provide: getRepositoryToken(MockUser),
                    useClass: MockRepository<MockUser>,
                },
                {
                    provide: getDataSourceToken(),
                    useFactory: dataSourceMockFactory,
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
        dataSource = module.get<DataSource>(getDataSourceToken());

        jest.clearAllMocks();
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
});
