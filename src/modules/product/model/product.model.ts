import { Searchable } from '@app/common';
import { Item } from 'src/modules/cart/model/item.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('PDV_PRODUCTS')
@Searchable('name')
export class Product {
    @PrimaryColumn('varchar', { unique: true })
    name: string;

    @Column('numeric', { precision: 5, scale: 2 })
    price: number;

    @Column({
        nullable: true,
    })
    unit?: boolean;

    @Column({ nullable: false })
    active: boolean;

    @Column('numeric', { precision: 5, scale: 2, nullable: false })
    inventory: number;

    @OneToMany(() => Item, (item) => item.product, { eager: false })
    items?: Item[];
}
