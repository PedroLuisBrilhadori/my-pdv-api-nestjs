import { FindOptionsDto } from '@app/common/database';
import { Injectable } from '@nestjs/common';
import { Purchase } from '../model';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindPurchaseService {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
    ) {}

    async find({ search, page, max, sort }: FindOptionsDto) {
        const skip = (page - 1) * max;

        const where = search ? { name: Like(`%${search}%`) } : null;

        const data = await this.repository.findAndCount({
            where,
            take: max,
            skip,
            relations: {
                items: true,
            },
        });

        return {
            data: data[0],
            total: data.length,
            page,
        };
    }
}
