import { Test } from '@nestjs/testing';
import { FindUserController, FindUserService } from '@app/modules/user';
import { faker } from '@faker-js/faker';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FindOptionsDto } from '@app/common/database';

const makeUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

const mockuser = makeUser();

describe('FindUserController', () => {
    let controller: FindUserController;
    let service: FindUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [FindUserController],
            providers: [
                {
                    provide: FindUserService,
                    useValue: {
                        find: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
                {
                    provide: Reflector,
                    useValue: {},
                },
            ],
        }).compile();

        controller = module.get<FindUserController>(FindUserController);
        service = module.get<FindUserService>(FindUserService);
    });

    it('should find one user', async () => {
        const findOptions: FindOptionsDto = {
            page: 1,
            max: 5,
        };

        const result = {
            data: [
                {
                    ...mockuser,
                    password: undefined,
                },
            ],
            total: 1,
            page: 1,
        };

        jest.spyOn(service, 'find').mockImplementation(async () => result);

        expect(await controller.execute(findOptions)).toBe(result);
    });
});
