import { Body, Controller, Param, Post } from '@nestjs/common';

import { UpdateInventoryService } from '../services';
import { UpdateInventoryDto } from '../dto';

@Controller('products')
export class UpdateInventoryController {
    constructor(private service: UpdateInventoryService) {}

    @Post('/:name/inventory')
    execute(@Param('name') name: string, @Body() dto: UpdateInventoryDto) {
        return this.service.update(name, dto);
    }
}
