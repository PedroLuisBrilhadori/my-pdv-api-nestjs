export type FindOptions = {
    page: number;
    max: number;
    search?: string;
    sorts?: { [key: string]: 'DESC' | 'ASC' };
};
