import { Item } from 'src/modules/cart/model/item.model';
import { BooleanTransformer } from '../../../utils/transformers';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('PDV_PRODUCTS')
export class Product {
    @PrimaryColumn({ unique: true })
    name: string;

    @Column('numeric', { precision: 5, scale: 2 })
    price: number;

    @Column('numeric', {
        precision: 1,
        scale: 0,
        nullable: true,
        transformer: new BooleanTransformer(),
    })
    unit?: boolean;

    @OneToMany(() => Item, (item) => item.product, { eager: false })
    items?: Item[];
}
