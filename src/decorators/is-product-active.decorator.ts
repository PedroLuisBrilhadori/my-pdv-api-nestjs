import { Product } from '@app/modules/product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { Repository } from 'typeorm';

export function IsProductActive(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsProductActiveContraint,
        });
    };
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsProductActiveContraint implements ValidatorConstraintInterface {
    private exists: boolean = false;

    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
    ) {}

    async validate(value: any, validationArguments?: ValidationArguments) {
        this.exists = false;

        const product = await this.repository.findOne({
            where: { name: value },
        });

        if (!product) return false;

        this.exists = true;

        if (!product.active) return false;

        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        if (this.exists) return 'Product is not active';

        return 'Product does not exist';
    }
}
