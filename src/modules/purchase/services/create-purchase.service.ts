import { AbstractCreateService, TableMetadata } from '@app/common/database';
import { Inject, Injectable } from '@nestjs/common';
import { Item, Purchase } from '../model';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreatePurchaseDto, CreatePurchaseItemDto } from '../dto';
import { Product } from '@app/modules/product';

@Injectable()
export class CreatePurchaseService extends AbstractCreateService<Purchase> {
    purchaseRepository: Repository<Purchase>;

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Item) private itemRepository: Repository<Item>,
        @InjectRepository(Purchase) repository: Repository<Purchase>,
    ) {
        super(repository);

        this.purchaseRepository = repository;
    }

    async createPurchase({ name, clientName, items }: CreatePurchaseDto) {
        const { data } = await super.create({ name, clientName });

        data.items = await this.createItems(items, data.id);

        await this.itemRepository.save(data.items);

        return { data };
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
