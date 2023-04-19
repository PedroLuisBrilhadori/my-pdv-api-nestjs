import {
    Injectable,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './model/product.model';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { FindOptions } from 'src/utils/types';
import { hasProperty } from 'src/utils/hasProperty';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
    ) {}

    async create(createProduct: CreateProductDto) {
        const isExists = await this.repository.findOne({
            where: { name: createProduct.name },
        });

        if (isExists) {
            const message = 'O Produto já existe.';
            throw new HttpException(message, HttpStatus.CONFLICT);
        }

        const product = this.repository.create(createProduct);
        await this.repository.save(product);
        return { product };
    }

    async findOne(name: string) {
        const product = await this.repository.findOne({ where: { name } });

        if (!product) throw new NotFoundException('Produto não encontrado.');

        return { product };
    }

    async find({ page, max, search, ...sorts }: FindOptions) {
        const skip = (page - 1) * max;
        const queryBuilder = this.repository.createQueryBuilder('PDV_PRODUCTS');

        if (search) {
            queryBuilder.where(
                'LOWER(unaccent(PDV_PRODUCTS.name)) LIKE LOWER(unaccent(:name)) ',
                {
                    name: `%${search}%`,
                },
            );
        }

        if (sorts) {
            const entries = Object.entries(sorts);
            const queryOrder = {};

            for (const sort of entries) {
                const field = sort.shift() as keyof Product;
                const order = sort.shift();

                if (order !== 'DESC' && order !== 'ASC') continue;

                if (!order || !field) continue;

                if (!hasProperty(Product, field)) continue;

                queryOrder[`PDV_PRODUCTS.${field}`] = order;
            }

            queryBuilder.orderBy(queryOrder);
        }

        const [data, total] = await queryBuilder
            .take(max)
            .skip(skip)
            .getManyAndCount();

        return { data, total, page };
    }

    async delete(name: string) {
        const { product } = await this.findOne(name);
        const { affected } = await this.repository.delete(product);

        if (!affected) {
            throw new HttpException(
                'Produto não deletado',
                HttpStatus.NOT_MODIFIED,
            );
        }

        return { product };
    }
}
