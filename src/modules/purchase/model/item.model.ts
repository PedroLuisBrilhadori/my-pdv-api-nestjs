import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product';
import { Purchase } from './purchase.model';
import { Searchable } from '@app/common/database';

@Entity('PDV_ITEMS')
@Searchable('productName')
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('uuid')
    purchaseId: string;

    @Column('numeric', { precision: 5, scale: 2, nullable: false })
    amount: number;

    @Column('varchar', { length: 100, nullable: false })
    productName: string;

    @Column('numeric', { precision: 5, scale: 2, nullable: false })
    paidValue: number;

    @ManyToOne(() => Product, { eager: true })
    product?: Product;

    @ManyToOne(() => Purchase, (purchase) => purchase.items, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    purchase?: Purchase;
}
