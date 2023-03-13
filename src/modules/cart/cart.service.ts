import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, Cart } from '.';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    ) {}

    async create(createCart: CreateCartDto) {
        const cart = this.cartRepository.create(createCart);
        const { items } = cart;

        try {
            await this.cartRepository.save(cart);

            items.map((item) => (item.cart = cart));
            await this.itemRepository.save(items);
            items.map((item) => (item.cart = undefined));
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return { cart };
    }

    async find(name?: string) {
        const carts = await this.cartRepository.find({
            where: { name },
            relations: ['items'],
        });

        return { carts };
    }

    async findOne(id: string) {
        const cart = await this.cartRepository.findOne({
            where: { id },
            relations: ['items'],
        });

        if (!cart) throw new NotFoundException('Carrinho não encontrado.');

        return { cart };
    }

    async delete(id: string) {
        const { cart } = await this.findOne(id);

        try {
            await this.cartRepository.remove(cart);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return { cart };
    }

    async update(
        cartId: string,
        { name, clientName, ...updateCart }: UpdateCartDto,
    ) {
        const items = this.itemRepository.create(updateCart.items);
        const { cart } = await this.findOne(cartId);

        await this.cartRepository.delete(cartId);

        cart.name = name || cart.name;
        cart.clientName = clientName;

        try {
            items.map((item) => {
                return (item.cartId = cart.id);
            });

            cart.items = items;
        } catch (error) {}

        console.log(cart);

        await this.cartRepository.save(cart);

        return { cart };
    }
}
