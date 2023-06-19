import { DataSource } from "typeorm";
import { QueryBuilderProvider } from "../../providers";
import { MockUser, createTestingModule, mockDataSource } from "../mocks";
import { TestingModule } from "@nestjs/testing";

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