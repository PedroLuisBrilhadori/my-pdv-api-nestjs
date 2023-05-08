import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigAppService } from 'src/config/config.service';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigAppService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
        };
    }
}
