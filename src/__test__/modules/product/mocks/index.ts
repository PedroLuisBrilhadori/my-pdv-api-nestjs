import { CreateProductDto } from '@app/modules/product/dto';
import { faker } from '@faker-js/faker';

export const makeProduct = (): CreateProductDto => ({
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    active: true,
    inventory: 10,
    unit: true,
});
