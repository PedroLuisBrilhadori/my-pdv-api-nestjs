import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { MockRepository } from '@app/common/database/__test__/mocks';

import {
    FindOneProductService,
    UpdatePriceService,
} from '@app/modules/product/services';

import { Product } from '@app/modules/product';
import { makeProduct } from '../mocks';

describe('UpdatePriceService', () => {
    let service: UpdatePriceService;
    let findOneService: FindOneProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdatePriceService,
                {
                    provide: getRepositoryToken(Product),
                    useClass: MockRepository<Product>,
                },
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
            ],
        }).compile();

        service = module.get<UpdatePriceService>(UpdatePriceService);

        findOneService = module.get<FindOneProductService>(
            FindOneProductService,
        );
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should update a product price', async () => {
        const product = makeProduct();

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        jest.spyOn(repository, 'update').mockImplementation();

        const { data } = await service.update(product.name, { price: 2 });

        expect(data.price).toBe(2);
    });

    it('should throw an error when an error in repository', async () => {
        const product = {
            ...makeProduct(),
            inventory: 1,
        };

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        jest.spyOn(repository, 'update').mockImplementation(async () => {
            throw new Error();
        });

        expect(
            async () => await service.update('product', { price: 2 }),
        ).rejects.toThrow(InternalServerErrorException);
    });
});
