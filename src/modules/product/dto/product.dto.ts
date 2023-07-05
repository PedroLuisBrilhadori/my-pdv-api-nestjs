import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    inventory: number;

    @IsBoolean()
    active: boolean;

    @IsBoolean()
    unit: boolean;
}
