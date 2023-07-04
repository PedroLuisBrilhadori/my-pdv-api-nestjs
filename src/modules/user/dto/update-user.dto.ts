import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

class Dto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}

export type UpdateUserDto = DeepPartial<Dto>;
