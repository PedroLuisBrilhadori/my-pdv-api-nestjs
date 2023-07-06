import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { UpdatePriceController } from '@app/modules/product/controllers';
import { UpdatePriceService } from '@app/modules/product/services';
import { makeProduct } from '../mocks';

describe('UpdatePriceController', () => {
    let controller: UpdatePriceController;
    let service: UpdatePriceService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UpdatePriceController],
            providers: [
                {
                    provide: UpdatePriceService,
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

        controller = module.get<UpdatePriceController>(UpdatePriceController);
        service = module.get<UpdatePriceService>(UpdatePriceService);
    });

    it('should update product price', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        result.data.active = !result.data.active;

        jest.spyOn(service, 'update').mockImplementation(async () => result);

        expect(await controller.execute(dto.name, { price: 2 })).toBe(result);
    });
});
