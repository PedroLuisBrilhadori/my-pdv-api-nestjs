import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { CreatePurchaseItemDto } from './create-item.dto';

export class CreatePurchaseDto {
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
    @Type(() => CreatePurchaseItemDto)
    items: CreatePurchaseItemDto[];
}
