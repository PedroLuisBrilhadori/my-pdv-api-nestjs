import { IsEnum, IsNumber } from 'class-validator';

export enum UpdateInventoryAction {
    Increment = 'increment',
    Decrement = 'decrement',
}

export class UpdateInventoryDto {
    @IsNumber()
    quantity: number;

    @IsEnum(UpdateInventoryAction)
    action: UpdateInventoryAction;
}
