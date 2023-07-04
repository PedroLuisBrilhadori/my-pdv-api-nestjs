import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractDeleteService } from '@app/common';
import { User } from '../model/user.model';

@Injectable()
export class DeleteUserService extends AbstractDeleteService<User> {
    constructor(@InjectRepository(User) repository: Repository<User>) {
        super(repository);
    }
}
