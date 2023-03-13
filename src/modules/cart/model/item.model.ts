import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product';
import { Cart } from './cart.model';

@Entity('PDV_ITEMS')
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('uuid')
    cartId: string;

    @Column('numeric', { precision: 5, scale: 2, nullable: false })
    amount: number;

    @ManyToOne(() => Product, (product) => product.items, {
        eager: true,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    product?: Product;

    @ManyToOne(() => Cart, (cart) => cart.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    cart?: Cart;
}
