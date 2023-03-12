import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async findOne(email: string): Promise<User> {
        return await this.repository.findOne({ where: { email } });
    }

    async create(createUser: CreateUserDto): Promise<User> {
        const user = this.repository.create(createUser);

        await this.repository.save(user);

        return user;
    }
}
