import { TestingModule } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { QueryRunnerProvider } from "../../providers";
import { createTestingModule, mockDataSource } from "../mocks";

describe('QueryRunner Provider', () => {
    it('should return a queryrunner instance', async () => {
        const module = async () =>
            createTestingModule([QueryRunnerProvider()], {
                provide: DataSource,
                useValue: mockDataSource,
            });

        expect(await module()).toBeInstanceOf(TestingModule);
    });
});
