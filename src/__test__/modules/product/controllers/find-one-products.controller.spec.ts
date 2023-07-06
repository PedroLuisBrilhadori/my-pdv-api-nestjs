import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import {
    FindOneProductController,
    FindOneProductService,
} from '@app/modules/product';

import { makeProduct } from '../mocks';

describe('FindOneProductController', () => {
    let controller: FindOneProductController;
    let service: FindOneProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [FindOneProductController],
            providers: [
                {
                    provide: FindOneProductService,
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

        controller = module.get<FindOneProductController>(
            FindOneProductController,
        );
        service = module.get<FindOneProductService>(FindOneProductService);
    });

    it('should find one user', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        jest.spyOn(service, 'findOne').mockImplementation(async () => result);

        expect(await controller.execute(dto)).toBe(result);
    });
});
