import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { CreateProductController } from '@app/modules/product/controllers';
import { CreateProductService } from '@app/modules/product/services';
import { makeProduct } from '../mocks';

describe('CreateProductController', () => {
    let controller: CreateProductController;
    let service: CreateProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CreateProductController],
            providers: [
                {
                    provide: CreateProductService,
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

        controller = module.get<CreateProductController>(
            CreateProductController,
        );
        service = module.get<CreateProductService>(CreateProductService);
    });

    it('should create a product', async () => {
        const dto = makeProduct();

        const result = {
            data: dto,
        };

        jest.spyOn(service, 'create').mockImplementation(async () => result);

        expect(await controller.execute(dto)).toBe(result);
    });
});
