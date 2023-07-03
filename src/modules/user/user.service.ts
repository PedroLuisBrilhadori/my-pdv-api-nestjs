import {
    Injectable,
    Inject,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';

export type Bcrypt = {
    hash: typeof hash;
    compare: typeof compare;
};

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject('BCRYPT') private bcrypt: Bcrypt,
    ) {}

    async findOne(email: string) {
        console.log(email);
        const user = await this.repository.findOne({ where: { email } });
        console.log(user);

        if (!user) throw new NotFoundException('Usuário não encontrado.');

        return { user };
    }

    async findPassword(email: string, password: string) {
        const { user } = await this.findOne(email);

        if (!this.bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async create(createUser: CreateUserDto) {
        const user = this.repository.create(createUser);

        user.password = await this.bcrypt.hash(user.password, 10);

        await this.repository.save(user);

        return { user };
    }
}
