import { DataSource } from 'typeorm';
import { MockType } from '../../../utils';

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
    () => ({
        createQueryRunner: jest
            .fn()
            .mockImplementation(() => new MockQueryRunner()),
    }),
);

export class MockQueryRunner {
    hasColumn = jest.fn();
}
