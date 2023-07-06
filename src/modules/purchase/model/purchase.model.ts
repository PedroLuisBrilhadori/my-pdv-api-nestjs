import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.model';

@Entity('PDV_PURCHASES')
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, length: '40' })
    name: string;

    @Column('varchar', { nullable: true, length: '40' })
    clientName?: string;

    @OneToMany(() => Item, (item) => item.purchase, { cascade: true })
    @JoinTable()
    items: Item[];
}
