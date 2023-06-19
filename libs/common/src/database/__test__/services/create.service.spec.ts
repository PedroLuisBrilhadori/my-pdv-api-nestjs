import { ConflictException } from "@nestjs/common";
import { Repository} from "typeorm";
import { TableMetadata } from "../../types";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";
import { MockCreateUserDto, MockCreateUserService, MockRepository, MockUser } from "../mocks";

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

describe('Abstract Create service', () => {
    let service: MockCreateUserService;
    let repository: Repository<MockUser>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockCreateUserService,
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

        service = module.get<MockCreateUserService>(MockCreateUserService);
        repository = module.get<Repository<MockUser>>(
            getRepositoryToken(MockUser),
        );
    });


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