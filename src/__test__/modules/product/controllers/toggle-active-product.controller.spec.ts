import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import {
    ToggleActiveController,
    ToggleActiveProductService,
} from '@app/modules/product/';

import { makeProduct } from '../mocks';

describe('ToggleActiveController', () => {
    let controller: ToggleActiveController;
    let service: ToggleActiveProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ToggleActiveController],
            providers: [
                {
                    provide: ToggleActiveProductService,
                    useValue: {
                        toggleActive: jest.fn(),
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

        controller = module.get<ToggleActiveController>(ToggleActiveController);
        service = module.get<ToggleActiveProductService>(
            ToggleActiveProductService,
        );
    });

    it('should toggle active product', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        result.data.active = !result.data.active;

        jest.spyOn(service, 'toggleActive').mockImplementation(
            async () => result,
        );

        expect(await controller.execute(dto.name)).toBe(result);
    });
});
