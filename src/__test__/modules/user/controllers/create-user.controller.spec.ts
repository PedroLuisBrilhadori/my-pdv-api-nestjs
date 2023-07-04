import { Test } from '@nestjs/testing';
import {
    CreateUserController,
    CreateUserDto,
    CreateUserService,
} from '@app/modules/user';
import { faker } from '@faker-js/faker';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('CreateUserController', () => {
    let controller: CreateUserController;
    let service: CreateUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CreateUserController],
            providers: [
                {
                    provide: CreateUserService,
                    useValue: {
                        create: jest.fn(),
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

        controller = module.get<CreateUserController>(CreateUserController);
        service = module.get<CreateUserService>(CreateUserService);
    });

    it('should create an user', async () => {
        const dto: CreateUserDto = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'admin',
        };

        const result = {
            data: {
                ...dto,
                password: undefined,
            },
        };

        jest.spyOn(service, 'create').mockImplementation(async () => result);

        expect(await controller.execute(dto)).toBe(result);
    });
});
