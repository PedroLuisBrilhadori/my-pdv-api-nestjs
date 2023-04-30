import { DataSource, QueryRunner } from 'typeorm';
import { Provider } from '@nestjs/common';

export const QueryRunnerProvider = (): Provider => ({
    provide: QueryRunnerProvider.name,
    inject: [DataSource],
    useFactory: (dataSource: DataSource): QueryRunner => {
        return dataSource.createQueryRunner();
    },
});
