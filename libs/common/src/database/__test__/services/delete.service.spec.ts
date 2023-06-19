import { DeleteResult, Repository } from "typeorm";
import { MockDeleteUserService, MockRepository, MockUser } from "../mocks";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Criteria } from "../../types";
import { HttpException } from "@nestjs/common";

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

describe('Abstract Delete service', () => {
    let service: MockDeleteUserService;
    let repository: Repository<MockUser>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockDeleteUserService,
                {
                    provide: getRepositoryToken(MockUser),
                    useClass: MockRepository<MockUser>,
                },
            ],
        }).compile();

        service = module.get<MockDeleteUserService>(MockDeleteUserService);
        repository = module.get<Repository<MockUser>>(
            getRepositoryToken(MockUser),
        );
    });



    it('should delete a user', async () => {
        const criteria: Criteria<MockUser> = mockuser.email;

        const result: DeleteResult = {
            raw: mockuser,
            affected: 1,
        };

        jest.spyOn(repository, 'delete').mockImplementation(
            async () => result,
        );

        expect(await service.delete(criteria)).toStrictEqual(result);
    });

    it('should throw an Error when database error happens.', async () => {
        const criteria: Criteria<MockUser> = mockuser.email;

        jest.spyOn(repository, 'delete').mockImplementation(async () => {
            throw new Error();
        });

        expect(async () => await service.delete(criteria)).rejects.toThrow(
            HttpException,
        );
    });
});