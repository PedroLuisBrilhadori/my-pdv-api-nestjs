import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DD_USERS')
export class User {
    @PrimaryColumn()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;
}
