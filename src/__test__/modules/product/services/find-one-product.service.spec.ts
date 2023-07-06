import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { TableMetadata } from '@app/common/database';

import { FindOneProductService, Product } from '@app/modules/product';

import { makeProduct } from '../mocks';

const mockProduct = makeProduct();

describe('FindOneProductService', () => {
    let service: FindOneProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindOneProductService,
                {
                    provide: getRepositoryToken(Product),
                    useClass: MockRepository<Product>,
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'Product',
                        tableName: 'Product',
                        searchName: 'name',
                    },
                },
                {
                    provide: 'BCRYPT',
                    useValue: { hash: hash, compare: compare },
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<FindOneProductService>(FindOneProductService);
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should find one product', async () => {
        const { name }: Product = mockProduct;

        const result = {
            data: mockProduct,
        };

        jest.spyOn(repository, 'findOne').mockImplementation(async () => ({
            ...mockProduct,
        }));

        expect(await service.findOne({ where: { name } })).toStrictEqual(
            result,
        );
    });
});
