import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractCreateService, TableMetadata } from '@app/common';
import { User } from '../model/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { Bcrypt } from '../types';

@Injectable()
export class CreateUserService extends AbstractCreateService<User> {
    constructor(
        @InjectRepository(User) repository: Repository<User>,
        @Inject(TableMetadata.name) tableMetadata: TableMetadata,
        @Inject('BCRYPT') private bcrypt: Bcrypt,
    ) {
        super(repository, tableMetadata);
    }

    async createUser(dto: CreateUserDto) {
        dto.password = await this.bcrypt.hash(dto.password, 10);

        return super.create(dto);
    }
}
