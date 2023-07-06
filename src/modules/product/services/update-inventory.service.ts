import { Repository } from 'typeorm';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../model/product.model';
import { UpdateInventoryDto } from '../dto';
import { FindOneProductService } from './find-one-product.product.service';

export type UpdateInventoryAction = 'decrement' | 'increment';
@Injectable()
export class UpdateInventoryService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
        private findOneService: FindOneProductService,
    ) {}

    async increment(name: string, { quantity }: UpdateInventoryDto) {
        return this.update('increment', name, { quantity });
    }

    async decrement(name: string, { quantity }: UpdateInventoryDto) {
        return this.update('decrement', name, { quantity });
    }

    private async update(
        action: UpdateInventoryAction,
        name: string,
        { quantity }: UpdateInventoryDto,
    ) {
        const data = await this.incrementOrDecrement(action, name, quantity);

        try {
            await this.repository.update({ name }, data);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return { data };
    }

    private async incrementOrDecrement(
        action: UpdateInventoryAction,
        name: string,
        quantity: number,
    ) {
        const { data } = await this.findOneService.findOne({ where: { name } });

        if (!data.active)
            throw new BadRequestException(`Produto: ${name} não está ativado.`);

        if (data.inventory <= 0 && action === 'decrement')
            throw new BadRequestException(`Produto: ${name} não tem estoque.`);

        if (action == 'increment') {
            data.inventory = Number(data.inventory) + quantity;
        } else {
            data.inventory = Number(data.inventory) - quantity;
        }

        return data;
    }
}
