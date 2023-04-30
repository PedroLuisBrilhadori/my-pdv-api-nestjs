import { DataSource, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { Provider } from '@nestjs/common';

export const QueryBuilderProvider = <TEntity>(model: any): Provider => ({
    provide: QueryBuilder.name,
    inject: [DataSource],
    useFactory: (dataSource: DataSource): SelectQueryBuilder<TEntity> => {
        return dataSource.createQueryBuilder(model.name);
    },
});
