import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';

import { Role } from '../../Auth';

export class UpdateUserRoleDto {
    @IsEnum(Role)
    @Transform(({ value }) => {
        return Role[value];
    })
    role: string;
}
