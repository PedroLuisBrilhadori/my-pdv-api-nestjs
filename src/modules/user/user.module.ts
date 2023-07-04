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
} from './services';
import {
    CreateUserController,
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
    ],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        JwtService,
        { provide: 'BCRYPT', useValue: { hash: hash, compare: compare } },
        CreateUserService,
        FindUserService,
        FindOneUserService,
        FindUserPasswordService,
        UpdateUserService,
        ...GetDatabaseProviders(User),
        JwtService,
    ],
    exports: [FindOneUserService, FindUserPasswordService],
})
export class UserModule {}
