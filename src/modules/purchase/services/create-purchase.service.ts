import { AbstractCreateService, TableMetadata } from '@app/common/database';
import { Inject, Injectable } from '@nestjs/common';
import { Purchase } from '../model';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreatePurchaseDto } from '../dto';
import { Product } from '@app/modules/product';

@Injectable()
export class CreatePurchaseService extends AbstractCreateService<Purchase> {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Purchase) repository: Repository<Purchase>,
    ) {
        super(repository);
    }

    async createPurchase({ name, clientName, items }: CreatePurchaseDto) {
        items.forEach(async (item) => {
            console.log(item);
            const product = this.productRepository.findOne({
                where: { name: item.productName },
            });
        });
    }
}
