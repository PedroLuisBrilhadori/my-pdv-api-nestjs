import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Purchase } from '../model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeletePurchaseSerivce {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
    ) {}

    async delete(id: string) {
        const data = await this.repository.findOne({
            where: { id },
            relations: { items: false },
        });

        if (!data) throw new NotFoundException(id, 'the purchase does exists.');

        await this.repository.delete(id);

        return { data };
    }
}
