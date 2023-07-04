import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.model';
import { Bcrypt } from '../types';

@Injectable()
export class FindUserPasswordService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject('BCRYPT') private bcrypt: Bcrypt,
    ) {}

    async findPassword(email: string, password: string) {
        const data = await this.repository.findOne({
            where: { email },
        });

        if (!this.bcrypt.compare(password, data.password)) {
            throw new UnauthorizedException();
        }

        return data;
    }
}
