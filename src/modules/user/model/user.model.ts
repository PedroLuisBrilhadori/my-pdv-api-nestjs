import { Searchable } from '@app/common/database';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DD_USERS')
@Searchable('email')
export class User {
    @PrimaryColumn('varchar', { length: 150, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { nullable: false })
    role: string;

    @Column('varchar', { length: 100, nullable: false })
    password: string;
}
