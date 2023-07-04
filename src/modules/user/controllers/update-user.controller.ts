import {
    BadRequestException,
    Body,
    Controller,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Role, Roles } from '@app/modules/Auth';
import { UpdateUserService } from '../services';
import { UpdateUserDto } from '../dto';

@Controller('user')
export class UpdateUserController {
    constructor(private service: UpdateUserService) {}

    @Patch('/:email')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.User, Role.Admin)
    async execute(@Param() { email }, @Body() dto: UpdateUserDto) {
        try {
            return await this.service.update(email, dto);
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
