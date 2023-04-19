import { getMetadataArgsStorage } from 'typeorm';

export function hasProperty<T>(
    clazz: Function,
    propertyName: keyof T,
): boolean {
    const columns = getMetadataArgsStorage().columns.filter(
        (col) => col.target === clazz && col.propertyName === propertyName,
    );
    return columns.length > 0;
}
