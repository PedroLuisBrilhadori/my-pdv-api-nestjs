import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchase } from '../model';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOnePurchaseService {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
    ) {}

    async findOne(findOptions: FindOneOptions<Purchase>) {
        const data = await this.repository.findOne({
            ...findOptions,
        });

        if (!data)
            throw new NotFoundException(
                findOptions.where['id'],
                'the purchase does exits.',
            );

        return data;
    }
}
