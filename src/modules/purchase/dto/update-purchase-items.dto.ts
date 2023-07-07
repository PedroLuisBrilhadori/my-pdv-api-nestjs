import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreatePurchaseItemDto } from './create-item.dto';
import { Type } from 'class-transformer';

export class UpdatePurchaseItemsDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseItemDto)
    items: CreatePurchaseItemDto[];
}
