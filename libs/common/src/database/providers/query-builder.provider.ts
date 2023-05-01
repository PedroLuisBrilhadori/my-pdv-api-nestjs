import {
    DataSource,
    ObjectLiteral,
    QueryBuilder,
    SelectQueryBuilder,
} from 'typeorm';
import { Provider } from '@nestjs/common';

export const QueryBuilderProvider = (model: any): Provider => ({
    provide: QueryBuilder.name,
    inject: [DataSource],
    useFactory: (dataSource: DataSource): SelectQueryBuilder<ObjectLiteral> => {
        const { tableName } = dataSource.getMetadata(model);
        return dataSource.createQueryBuilder(model, tableName);
    },
});
