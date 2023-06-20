import { FactoryProvider, Provider } from '@nestjs/common';
import { QueryRunnerProvider } from './query-runner.provider';
import { QueryBuilderProvider } from './query-builder.provider';
import { TableMetadataProvider } from './metadata.provider';

export const GetDatabaseProviders = (model: any): FactoryProvider[] => [
    QueryRunnerProvider(),
    QueryBuilderProvider(model),
    TableMetadataProvider(model),
];
