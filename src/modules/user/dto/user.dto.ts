import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Max(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Max(100)
    email: string;

    @IsString()
    @Min(6)
    @Max(40)
    password: string;
}
