import { FindOptionsDto } from '@app/common/database';
import { Controller, Get, Param } from '@nestjs/common';
import { FindOneProductService } from '../services';

@Controller('products')
export class FindOneProductController {
    constructor(private service: FindOneProductService) {}

    @Get(':name')
    async execute(@Param() { name }) {
        return this.service.findOne(name);
    }
}
