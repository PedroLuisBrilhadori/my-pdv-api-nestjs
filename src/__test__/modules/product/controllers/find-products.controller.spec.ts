import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FindOptionsDto } from '@app/common/database';

import { FindProductController } from '@app/modules/product/controllers';
import { FindProductService } from '@app/modules/product/services';
import { makeProduct } from '../mocks';

describe('FindProductController', () => {
    let controller: FindProductController;
    let service: FindProductService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [FindProductController],
            providers: [
                {
                    provide: FindProductService,
                    useValue: {
                        find: jest.fn(),
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

        controller = module.get<FindProductController>(FindProductController);
        service = module.get<FindProductService>(FindProductService);
    });

    it('should find products', async () => {
        const findOptions: FindOptionsDto = {
            page: 1,
            max: 5,
        };

        const result = {
            data: [makeProduct()],
            total: 1,
            page: 1,
        };

        jest.spyOn(service, 'find').mockImplementation(async () => result);

        expect(await controller.execute(findOptions)).toBe(result);
    });
});
