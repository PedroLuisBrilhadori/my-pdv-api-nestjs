import { Injectable } from '@nestjs/common';
import { Purchase } from '../model';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOnePurchaseService {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
    ) {}

    async findOne(findOptions: FindOneOptions<Purchase>) {
        return this.repository.findOne({
            ...findOptions,
        });
    }
}
