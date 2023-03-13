import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';

export class CreateCartItemDto {
    @IsObject()
    @IsDefined()
    product: { name: string };

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

export class CreateCartDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    clientName?: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDto)
    items: CreateCartItemDto[];
}

export class UpdateCartDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    clientName?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDto)
    items?: CreateCartItemDto[];
}
