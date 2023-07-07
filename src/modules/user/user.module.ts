import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetDatabaseProviders } from '@app/common/database';

import { User } from './model/user.model';

import {
    CreateUserService,
    FindUserPasswordService,
    FindUserService,
    FindOneUserService,
    UpdateUserService,
    DeleteUserService,
} from './services';
import {
    CreateUserController,
    DeleteUserController,
    FindOneUserController,
    FindUserController,
    UpdateUserController,
} from './controllers';

@Module({
    controllers: [
        CreateUserController,
        FindUserController,
        FindOneUserController,
        UpdateUserController,
        DeleteUserController,
    ],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        JwtService,
        CreateUserService,
        FindUserService,
        FindOneUserService,
        FindUserPasswordService,
        UpdateUserService,
        DeleteUserService,
        { provide: 'BCRYPT', useValue: { hash: hash, compare: compare } },
        ...GetDatabaseProviders(User),
    ],
    exports: [FindOneUserService, FindUserPasswordService, TypeOrmModule],
})
export class UserModule {}
