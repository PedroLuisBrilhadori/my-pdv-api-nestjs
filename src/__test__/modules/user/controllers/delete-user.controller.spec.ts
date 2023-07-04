import { Test } from '@nestjs/testing';
import { DeleteUserController, DeleteUserService } from '@app/modules/user';
import { faker } from '@faker-js/faker';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';

describe('DeleteUserController', () => {
    let controller: DeleteUserController;
    let service: DeleteUserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [DeleteUserController],
            providers: [
                {
                    provide: DeleteUserService,
                    useValue: {
                        delete: jest.fn(),
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

        controller = module.get<DeleteUserController>(DeleteUserController);
        service = module.get<DeleteUserService>(DeleteUserService);
    });

    it('should delete an user', async () => {
        const user = {
            email: faker.internet.email(),
        };

        const result: DeleteResult = {
            raw: 0,
            affected: 1,
        };

        jest.spyOn(service, 'delete').mockImplementation(async () => result);

        expect(await controller.execute(user)).toBe(result);
    });
});
