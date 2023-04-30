import { Item } from 'src/modules/cart/model/item.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('PDV_PRODUCTS')
export class Product {
    @PrimaryColumn('varchar', { unique: true })
    name: string;

    @Column('numeric', { precision: 5, scale: 2 })
    price: number;

    @Column({
        nullable: true,
    })
    unit?: boolean;

    @OneToMany(() => Item, (item) => item.product, { eager: false })
    items?: Item[];
}
