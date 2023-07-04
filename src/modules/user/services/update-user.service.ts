import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.model';
import { UpdateUserDto } from '../dto';
import { FindOneUserService } from './find-one-user.service';

export class UpdateUserService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        private findOneService: FindOneUserService,
    ) {}

    async update(email: string, { name }: UpdateUserDto) {
        return this._update(email, { name });
    }

    private async _update(email: string, dto: UpdateUserDto) {
        try {
            await this.repository
                .createQueryBuilder()
                .update()
                .set(dto)
                .where(`email = :email`, { email })
                .execute();

            return this.findOneService.findOne({ where: { email } });
        } catch (error) {
            throw new Error();
        }
    }
}
