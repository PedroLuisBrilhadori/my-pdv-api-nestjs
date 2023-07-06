import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QueryBuilder, SelectQueryBuilder } from 'typeorm';
import {
    MockQueryBuilder,
    MockQueryRunner,
} from '@app/common/database/__test__/mocks';
import {
    FindOptionsDto,
    QueryRunnerProvider,
    TableMetadata,
} from '@app/common/database';

import { FindProductService } from '@app/modules/product/services';
import { Product } from '@app/modules/product';

import { makeProduct } from '../mocks';

const mockProducts = [
    makeProduct(),
    makeProduct(),
    makeProduct(),
    makeProduct(),
    makeProduct(),
];

describe('FindProductService', () => {
    let service: FindProductService;
    let queryBuilder: SelectQueryBuilder<Product>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindProductService,
                {
                    provide: QueryBuilder.name,
                    useClass: MockQueryBuilder,
                },
                {
                    provide: QueryRunnerProvider.name,
                    useClass: MockQueryRunner,
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
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<FindProductService>(FindProductService);
        queryBuilder = module.get<SelectQueryBuilder<Product>>(
            QueryBuilder.name,
        );
    });

    it('should find Products', async () => {
        const findOptions: FindOptionsDto = {
            page: 1,
            max: 5,
        };

        const result = {
            page: findOptions.page,
            data: mockProducts.slice(0, 4),
            total: mockProducts.length,
        };

        jest.spyOn(queryBuilder, 'getManyAndCount').mockImplementation(
            async () => [mockProducts.slice(0, 4), mockProducts.length],
        );

        expect(await service.find(findOptions)).toStrictEqual(result);
    });
});
