export const SearchableKey = Symbol('searchable');

export const Searchable = (name: string) =>
    Reflect.metadata(SearchableKey, name);
