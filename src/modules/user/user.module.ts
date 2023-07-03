import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        JwtService,
        UserService,
        { provide: 'BCRYPT', useValue: { hash: hash, compare: compare } },
    ],
    exports: [UserService],
})
export class UserModule {}
