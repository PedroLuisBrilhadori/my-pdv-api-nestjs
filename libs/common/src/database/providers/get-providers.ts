import { Provider } from '@nestjs/common';
import { QueryRunnerProvider } from './query-runner.provider';
import { QueryBuilderProvider } from './query-builder.provider';
import { TableMetadataProvider } from './metadata.provider';

export const GetDatabaseProviders = (model: any): Provider[] => [
    QueryRunnerProvider(),
    QueryBuilderProvider(model),
    TableMetadataProvider(model),
];
