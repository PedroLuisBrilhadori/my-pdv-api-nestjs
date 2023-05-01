import { DataSource, QueryRunner } from 'typeorm';
import { FactoryProvider } from '@nestjs/common';

export const QueryRunnerProvider = (): FactoryProvider => ({
    provide: QueryRunnerProvider.name,
    inject: [DataSource],
    useFactory: (dataSource: DataSource): QueryRunner => {
        return dataSource.createQueryRunner();
    },
});
