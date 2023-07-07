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
        const total = this.repository.count();

        const data = await this.repository.find({
            where: { name: Like(`%${search}%`) },
            take: max,
            skip,
            relations: {
                items: true,
            },
        });

        return {
            data,
            total,
            page,
        };
    }
}
