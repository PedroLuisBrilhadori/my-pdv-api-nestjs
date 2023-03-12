import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DD_USERS')
export class User {
    @PrimaryColumn('varchar', { length: 150, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 100, nullable: false })
    password: string;
}
