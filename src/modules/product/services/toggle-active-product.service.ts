import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../model/product.model';
import { FindOneProductService } from './find-one-product.product.service';

@Injectable()
export class ToggleActiveProductService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
        private findOneService: FindOneProductService,
    ) {}

    async toggleActive(name: string) {
        const { data } = await this.findOneService.findOne({ where: { name } });

        data.active = !data.active;

        try {
            await this.repository.update({ name }, data);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return { data };
    }
}
