import { TestingModule } from "@nestjs/testing";
import { DataSource } from "typeorm";

import { GetDatabaseProviders } from "../../providers";
import { createTestingModule, MockUser, mockDataSource } from "../mocks";

describe('GetDatabaseProviders', () => {
    it('should return all providers to database', async () => {
        const module = async () =>
            createTestingModule(GetDatabaseProviders(MockUser), {
                provide: DataSource,
                useValue: mockDataSource,
            });

        expect(await module()).toBeInstanceOf(TestingModule);
    });
});