import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

import { Role } from '../../Auth';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsEnum(Role)
    @Transform(({ value }) => {
        return Role[value];
    })
    role: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password: string;
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(150)
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password: string;
}
