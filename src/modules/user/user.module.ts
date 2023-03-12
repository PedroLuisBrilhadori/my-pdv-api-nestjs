import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { compare, hash } from 'bcrypt';

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        { provide: 'BCRYPT', useValue: { hash: hash, compare: compare } },
    ],
})
export class UserModule {}
