import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformSortType } from '../../utils';
import { SortParam } from '../types';

export class FindOptionsDto {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    max: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => {
        return transformSortType(value);
    })
    sort?: SortParam[] | SortParam;
}
