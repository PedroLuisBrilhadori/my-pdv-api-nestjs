import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { MockRepository } from '@app/common/database/__test__/mocks';

import {
    FindOneProductService,
    UpdateInventoryService,
    Product,
} from '@app/modules/product/';

import { makeProduct } from '../mocks';

describe('UpdateInventoryService', () => {
    let service: UpdateInventoryService;
    let findOneService: FindOneProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateInventoryService,
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

        service = module.get<UpdateInventoryService>(UpdateInventoryService);

        findOneService = module.get<FindOneProductService>(
            FindOneProductService,
        );
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should increment product inventory quantity', async () => {
        const product = makeProduct();

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        jest.spyOn(repository, 'update').mockImplementation();

        const { data } = await service.increment(product.name, { quantity: 2 });

        expect(data.inventory).toBe(12);
    });

    it('should decrement product inventory quantity', async () => {
        const product = makeProduct();

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        jest.spyOn(repository, 'update').mockImplementation();

        const { data } = await service.decrement(product.name, { quantity: 2 });

        expect(data.inventory).toBe(8);
    });

    it('should throw an error when product is deactivated', async () => {
        const product = {
            ...makeProduct(),
            active: false,
        };

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        expect(async () =>
            service.decrement('product', { quantity: 2 }),
        ).rejects.toThrowError(BadRequestException);
    });

    it('should throw an error when product inventory is insufficient', async () => {
        const product = {
            ...makeProduct(),
            inventory: 1,
        };

        jest.spyOn(findOneService, 'findOne').mockImplementation(async () => ({
            data: product,
        }));

        expect(
            async () => await service.decrement('product', { quantity: 2 }),
        ).rejects.toThrow(BadRequestException);
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
            async () => await service.increment('product', { quantity: 2 }),
        ).rejects.toThrow(InternalServerErrorException);
    });
});
