import { Test } from '@nestjs/testing';
import {
    CreateUserDto,
    UpdateUserController,
    UpdateUserService,
} from '@app/modules/user';
import { faker } from '@faker-js/faker';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

const makeUser = (): CreateUserDto => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin',
});

describe('UpdateUserController', () => {
    let controller: UpdateUserController;
    let service: UpdateUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UpdateUserController],
            providers: [
                {
                    provide: UpdateUserService,
                    useValue: {
                        update: jest.fn(),
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

        controller = module.get<UpdateUserController>(UpdateUserController);
        service = module.get<UpdateUserService>(UpdateUserService);
    });

    it('should update an user', async () => {
        const user = makeUser();

        const newName = { ...user, name: faker.person.fullName() };

        const result = {
            data: {
                ...newName,
                password: undefined,
            },
        };

        jest.spyOn(service, 'update').mockImplementation(async () => result);

        expect(await controller.execute(user, newName)).toBe(result);
    });

    it('should throw an error when bad user update', async () => {
        const user = makeUser();

        jest.spyOn(service, 'update').mockImplementation(async () => {
            throw new Error();
        });

        expect(async () => await controller.execute(user, {})).rejects.toThrow(
            BadRequestException,
        );
    });
});
