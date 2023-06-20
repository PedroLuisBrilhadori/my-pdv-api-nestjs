import { FindOptionsDto } from '@app/common/database';
import { Controller, Get, Query } from '@nestjs/common';
import { FindProductService } from '../services';

@Controller('products')
export class FindProductController {
    constructor(private service: FindProductService) {}

    @Get()
    async execute(
        @Query()
        options: FindOptionsDto,
    ) {
        return this.service.find(options);
    }
}
