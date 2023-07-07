import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { TableMetadata } from '@app/common/database';

import { CreateProductService, Product } from '@app/modules/product/';

import { makeProduct } from '../mocks';

const mockProduct = makeProduct();

describe('CreateProductService', () => {
    let service: CreateProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateProductService,
                {
                    provide: getRepositoryToken(Product),
                    useClass: MockRepository<Product>,
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'User',
                        tableName: 'User',
                        searchName: 'email',
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

        service = module.get<CreateProductService>(CreateProductService);
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should create a mock product', async () => {
        const dto: Product = mockProduct;

        const result = {
            data: mockProduct,
        };

        jest.spyOn(repository, 'create').mockImplementation(() => dto);

        jest.spyOn(repository, 'save').mockImplementation(async () => dto);

        expect(await service.create(dto)).toStrictEqual(result);
    });
});
