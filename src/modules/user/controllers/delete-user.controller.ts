import { Controller, UseGuards, Delete, Param } from '@nestjs/common';
import { DeleteUserService } from '../services';
import { Role, Roles, JwtAuthGuard } from '../../Auth';

@Controller('user')
export class DeleteUserController {
    constructor(private service: DeleteUserService) {}

    @Delete(':email')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async execute(@Param() { email }) {
        return this.service.delete(email);
    }
}
