import { DataSource } from 'typeorm';
import { TestingModule } from '@nestjs/testing';

import { MockUser, MockClass, createTestingModule, mockDataSource } from '../mocks';
import {TableMetadataProvider} from '../../providers';


describe('Metadata provider', () => {
    it('should return a metadata of entity', async () => {
        const module = async () =>
            await createTestingModule([TableMetadataProvider(MockUser)], {
                provide: DataSource,
                useValue: mockDataSource,
            });

        expect(await module()).toBeInstanceOf(TestingModule);
    });

    it('should return an error when metadata entity not found', async () => {
        const module = async () =>
            await createTestingModule([TableMetadataProvider(MockClass)], {
                provide: DataSource,
                useValue: {
                    getMetadata(model: any) {
                        return {};
                    },
                },
            });

        expect(async () => await module()).rejects.toThrow(Error);
    });

    it('should return an error when class not found', async () => {
        const module = async () =>
            await createTestingModule([TableMetadataProvider({})], {
                provide: DataSource,
                useValue: mockDataSource,
            });

        expect(async () => await module()).rejects.toThrow(Error);
    });
});