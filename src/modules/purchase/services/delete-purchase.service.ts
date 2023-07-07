import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item, Purchase } from '../model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeletePurchaseSerivce {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
        @InjectRepository(Item) private itemRepository: Repository<Item>,
    ) {}

    async delete(id: string) {
        const data = await this.repository.findOne({
            where: { id },
            relations: { items: true },
        });

        if (!data) throw new NotFoundException(id, 'the purchase does exists.');

        for (const { id, purchaseId } of data.items) {
            await this.itemRepository.delete({
                id,
                purchaseId,
            });
        }

        await this.repository.delete(id);

        return { data };
    }
}
