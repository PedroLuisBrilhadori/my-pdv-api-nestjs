import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, Purchase } from '../model';
import { Repository } from 'typeorm';
import { CreatePurchaseItemDto, UpdatePurchaseItemsDto } from '../dto';
import { Product } from '@app/modules/product';

@Injectable()
export class UpdatePurchaseItemService {
    constructor(
        @InjectRepository(Purchase) private repository: Repository<Purchase>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Item) private itemRepository: Repository<Item>,
    ) {}

    async update(id: string, { items }: UpdatePurchaseItemsDto) {
        const data = await this.repository.findOne({
            where: { id },
            relations: { items: true },
        });

        if (!data) throw new NotFoundException(id, 'the purchase does exist.');

        await this.deleteItems(data.items);

        data.items = await this.createItems(items, id);

        await this.itemRepository.save(data.items);

        return { data };
    }

    private async deleteItems(items: Item[]) {
        for (const { id, purchaseId } of items) {
            await this.itemRepository.delete({
                id,
                purchaseId,
            });
        }
    }

    private async createItems(
        itemsDto: CreatePurchaseItemDto[],
        purchaseId: string,
    ) {
        const items: Item[] = [];

        for (const dto of itemsDto) {
            const { price } = await this.productRepository.findOne({
                where: { name: dto.productName },
            });

            const item = this.itemRepository.create({
                ...dto,
                purchaseId,
                paidValue: price,
            });

            items.push(item);
        }

        return items;
    }
}
