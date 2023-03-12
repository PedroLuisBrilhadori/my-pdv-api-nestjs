import {
    Injectable,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
    ) {}

    async create(createProduct: CreateProductDto) {
        const product = this.repository.create(createProduct);
        await this.repository.save(product);
        return product;
    }

    async findOne(name: string) {
        const product = await this.repository.findOne({ where: { name } });

        if (!product) throw new NotFoundException('Produto não encontrado.');

        return product;
    }

    async find(name?: string) {
        return await this.repository.find({ where: { name } });
    }

    async delete(name: string) {
        const product = await this.findOne(name);
        const { affected } = await this.repository.delete(product);

        if (!affected) {
            throw new HttpException(
                'Produto não deletado',
                HttpStatus.NOT_MODIFIED,
            );
        }

        return product;
    }
}
