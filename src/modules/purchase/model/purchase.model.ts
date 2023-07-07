import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.model';
import { Searchable } from '@app/common/database';

@Entity('PDV_PURCHASES')
@Searchable('name')
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, length: '40' })
    name: string;

    @Column('varchar', { nullable: true, length: '40' })
    clientName?: string;

    @OneToMany(() => Item, (item) => item.purchase)
    @JoinTable()
    items: Item[];
}
