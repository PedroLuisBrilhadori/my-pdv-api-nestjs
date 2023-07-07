import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '@app/common/database/__test__/mocks';
import { Criteria, TableMetadata } from '@app/common/database';
import { faker } from '@faker-js/faker';

import { DeleteProductService, Product } from '@app/modules/product/';

describe('DeleteProductService', () => {
    let service: DeleteProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                DeleteProductService,
                {
                    provide: getRepositoryToken(Product),
                    useClass: MockRepository<Product>,
                },
                {
                    provide: TableMetadata.name,
                    useValue: {
                        name: 'Product',
                        tableName: 'product',
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

        service = module.get<DeleteProductService>(DeleteProductService);
        repository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should delete a product', async () => {
        const criteria: Criteria<Product> = faker.commerce.productName();

        const result: DeleteResult = {
            raw: 0,
            affected: 1,
        };

        jest.spyOn(repository, 'delete').mockImplementation(async () => result);

        expect(await service.delete(criteria)).toStrictEqual(result);
    });
});
