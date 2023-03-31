export type FindOptions = {
    page: number;
    max: number;
    order: { [key: string]: 'asc' | 'desc' };
};
