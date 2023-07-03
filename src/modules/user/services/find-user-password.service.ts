import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FindOneUserService } from './find-one-user.service';
import { Bcrypt } from './create-user.service';

@Injectable()
export class FindUserPasswordService {
    constructor(
        private findOneService: FindOneUserService,
        @Inject('BCRYPT') private bcrypt: Bcrypt,
    ) {}

    async findPassword(email: string, password: string) {
        const { user } = await this.findOneService.findOne({
            where: { email },
        });

        if (!this.bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
