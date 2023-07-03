import 'reflect-metadata';
import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SearchableKey } from '../decorators';
import { TableMetadata } from '../types';

type Class = new () => any;

export const TableMetadataProvider = (model: Class): FactoryProvider => ({
    provide: TableMetadata.name,
    inject: [DataSource],
    useFactory: (dataSource: DataSource): TableMetadata => {
        const searchName = Reflect.getMetadata(SearchableKey, model);
        const { targetName, tableName } = dataSource.getMetadata(model);

        if (!searchName || !targetName || !tableName)
            throw new Error(`metadata not found in ${model.name} class.`);

        return {
            name: targetName,
            searchName,
            tableName,
        };
    },
});
