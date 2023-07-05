import { IsNumber } from 'class-validator';

export class UpdatePriceDto {
    @IsNumber()
    price: number;
}
