import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from '../model/product.model';
import { FindOneProductService } from './find-one-product.product.service';
import { UpdatePriceDto } from '../dto';

@Injectable()
export class UpdatePriceService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
        private findOneService: FindOneProductService,
    ) {}

    async update(name: string, { price }: UpdatePriceDto) {
        const { data } = await this.findOneService.findOne({ where: { name } });

        data.price = price;

        try {
            await this.repository.update({ name }, data);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return { data };
    }
}
