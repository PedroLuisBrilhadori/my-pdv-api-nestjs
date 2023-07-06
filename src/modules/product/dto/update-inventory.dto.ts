import { IsNumber } from 'class-validator';

export class UpdateInventoryDto {
    @IsNumber()
    quantity: number;
}
