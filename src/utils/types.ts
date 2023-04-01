export type FindOptions = {
    page: number;
    max: number;
    order?: { [key: string]: 'desc' | 'asc' };
    search?: string;
};
