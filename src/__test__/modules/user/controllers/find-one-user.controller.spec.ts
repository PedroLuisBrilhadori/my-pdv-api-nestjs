import { Test } from '@nestjs/testing';
import {
    CreateUserDto,
    FindOneUserController,
    FindOneUserService,
} from '@app/modules/user';
import { faker } from '@faker-js/faker';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

describe('FindOneUserController', () => {
    let controller: FindOneUserController;
    let service: FindOneUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [FindOneUserController],
            providers: [
                {
                    provide: FindOneUserService,
                    useValue: {
                        findOne: jest.fn(),
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

        controller = module.get<FindOneUserController>(FindOneUserController);
        service = module.get<FindOneUserService>(FindOneUserService);
    });

    it('should find one user', async () => {
        const user = makeUser();

        const result = {
            data: {
                ...user,
                password: undefined,
            },
        };

        jest.spyOn(service, 'findOne').mockImplementation(async () => result);

        expect(await controller.execute(user)).toBe(result);
    });
});
