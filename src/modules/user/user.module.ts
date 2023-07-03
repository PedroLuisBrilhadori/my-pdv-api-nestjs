import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetDatabaseProviders } from '@app/common/database';
import {
    CreateUserService,
    FindUserPasswordService,
    FindUserService,
    FindOneUserService,
} from './services';

import { User } from './model/user.model';
import { CreateUserController } from './controllers/create-user.controller';
import { FindUserController } from './controllers/find-user.controller';
import { FindOneUserController } from './controllers/find-one-user.controller';

@Module({
    controllers: [
        CreateUserController,
        FindUserController,
        FindOneUserController,
    ],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        JwtService,
        { provide: 'BCRYPT', useValue: { hash: hash, compare: compare } },
        CreateUserService,
        FindUserService,
        FindOneUserService,
        FindUserPasswordService,
        ...GetDatabaseProviders(User),
        JwtService,
    ],
    exports: [FindOneUserService, FindUserPasswordService],
})
export class UserModule {}
