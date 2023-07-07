import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsProductActive } from '@app/decorators';

export class CreatePurchaseItemDto {
    @IsString()
    @IsDefined()
    @IsProductActive()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
