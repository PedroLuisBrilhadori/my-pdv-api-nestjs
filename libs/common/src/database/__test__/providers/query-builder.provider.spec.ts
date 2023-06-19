import { DataSource } from "typeorm";
import { TestingModule } from "@nestjs/testing";

import { QueryBuilderProvider } from "../../providers";
import { MockUser, createTestingModule, mockDataSource } from "../mocks";

describe('QueryBuilder Provider', () => {
    it('should return a querybuilder instance', async () => {
        const module = async () =>
            createTestingModule([QueryBuilderProvider(MockUser)], {
                provide: DataSource,
                useValue: mockDataSource,
            });

        expect(await module()).toBeInstanceOf(TestingModule);
    });
});