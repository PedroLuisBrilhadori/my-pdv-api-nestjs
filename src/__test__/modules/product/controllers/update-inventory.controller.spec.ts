import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import {
    UpdateInventoryController,
    UpdateInventoryService,
} from '@app/modules/product/';

import { makeProduct } from '../mocks';

describe('UpdateInventoryController', () => {
    let controller: UpdateInventoryController;
    let service: UpdateInventoryService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UpdateInventoryController],
            providers: [
                {
                    provide: UpdateInventoryService,
                    useValue: {
                        increment: jest.fn(),
                        decrement: jest.fn(),
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

        controller = module.get<UpdateInventoryController>(
            UpdateInventoryController,
        );
        service = module.get<UpdateInventoryService>(UpdateInventoryService);
    });

    it('should decrement inventory product', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        result.data.active = !result.data.active;

        jest.spyOn(service, 'decrement').mockImplementation(async () => result);

        expect(await controller.decrement(dto.name, { quantity: 2 })).toBe(
            result,
        );
    });

    it('should increment inventory product', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        result.data.active = !result.data.active;

        jest.spyOn(service, 'increment').mockImplementation(async () => result);

        expect(await controller.increment(dto.name, { quantity: 2 })).toBe(
            result,
        );
    });
});
