import { MockType } from '../../../utils';
import { DataSource } from 'typeorm';

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
