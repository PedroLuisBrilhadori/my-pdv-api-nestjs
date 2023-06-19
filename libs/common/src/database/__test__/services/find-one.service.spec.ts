import { FindOneOptions, Repository } from "typeorm";
import { MockFindOneUserService, MockRepository, MockUser } from "../mocks";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TableMetadata } from "../../types";
import { NotFoundException } from "@nestjs/common";

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
            mockuser,
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

        expect(
            async () => await service.findOne(findOptions),
        ).rejects.toThrow(NotFoundException);
    });
});