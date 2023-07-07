import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePurchaseDto } from '../dto';
import { CreatePurchaseService } from '../services';

@Controller('purchase')
export class CreatePurchaseController {
    constructor(private service: CreatePurchaseService) {}

    @Post('/')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.User)
    execute(@Body() dto: CreatePurchaseDto) {
        return this.service.create(dto);
    }
}
