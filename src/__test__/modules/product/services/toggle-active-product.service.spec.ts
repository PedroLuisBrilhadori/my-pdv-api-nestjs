import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { MockRepository } from '@app/common/database/__test__/mocks';

import {
    FindOneProductService,
    ToggleActiveProductService,
    Product,
} from '@app/modules/product/';

import { makeProduct } from '../mocks';

describe('ToggleActiveProductService', () => {
    let service: ToggleActiveProductService;
    let findOneService: FindOneProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ToggleActiveProductService,
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

        service = module.get<ToggleActiveProductService>(
            ToggleActiveProductService,
        );

        findOneService = module.get<FindOneProductService>(
            FindOneProductService,
        );
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should toggle active product', async () => {
        const product = makeProduct();

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        jest.spyOn(repository, 'update').mockImplementation();

        const { data } = await service.toggleActive(product.name);

        expect(data.active).toBe(false);
    });

    it('should throw a error when repository error', async () => {
        const product = makeProduct();

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        expect(
            async () => await service.toggleActive(product.name),
        ).rejects.toThrow(InternalServerErrorException);
    });
});
