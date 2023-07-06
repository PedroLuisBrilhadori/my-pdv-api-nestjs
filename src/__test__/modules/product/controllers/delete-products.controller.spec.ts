import { DeleteResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import {
    DeleteProductController,
    DeleteProductService,
} from '@app/modules/product';

import { makeProduct } from '../mocks';

describe('DeleteProductController', () => {
    let controller: DeleteProductController;
    let service: DeleteProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [DeleteProductController],
            providers: [
                {
                    provide: DeleteProductService,
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

        controller = module.get<DeleteProductController>(
            DeleteProductController,
        );
        service = module.get<DeleteProductService>(DeleteProductService);
    });

    it('should delete a product', async () => {
        const product = makeProduct();

        const result: DeleteResult = {
            raw: 0,
            affected: 1,
        };

        jest.spyOn(service, 'delete').mockImplementation(async () => result);

        expect(await controller.execute(product)).toBe(result);
    });
});
