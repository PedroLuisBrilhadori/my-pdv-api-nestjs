export const SearchableKey = Symbol('searchable');

export function Searchable(name: string) {
    return Reflect.metadata(SearchableKey, name);
}
