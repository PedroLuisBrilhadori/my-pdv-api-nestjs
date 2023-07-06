import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePurchaseDto } from '../dto';

@Controller('purchase')
export class CreatePurchaseController {
    @Post('/')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.User)
    execute(@Body() dto: CreatePurchaseDto) {
        return dto;
    }
}
