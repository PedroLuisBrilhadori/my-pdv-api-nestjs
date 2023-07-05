import { Repository } from 'typeorm';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '..';
import { UpdateInventoryDto } from '../dto';
import { FindOneProductService } from './find-one-product.product.service';

@Injectable()
export class UpdateInventoryService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
        private findOneService: FindOneProductService,
    ) {}

    async update(name: string, { quantity, action }: UpdateInventoryDto) {
        const { data } = await this.findOneService.findOne({ where: { name } });

        if (!data.active)
            throw new BadRequestException(`Produto: ${name} não está ativado.`);

        if (data.inventory <= 0 && action === 'decrement')
            throw new BadRequestException(`Produto ${name} sem estoque.`);

        if (action == 'increment') {
            data.inventory = Number(data.inventory) + quantity;
        } else {
            data.inventory = Number(data.inventory) - quantity;
        }

        try {
            await this.repository.update({ name }, data);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return { data };
    }
}
