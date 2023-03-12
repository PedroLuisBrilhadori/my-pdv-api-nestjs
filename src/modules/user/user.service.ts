import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async register(createUser: CreateUserDto): Promise<User> {
        const user = this.repository.create(createUser);

        await this.repository.save(user);

        return user;
    }

    async login(loginUser: LoginUserDto): Promise<User> {
        return new User();
    }
}
