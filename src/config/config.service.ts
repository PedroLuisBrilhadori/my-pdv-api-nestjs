import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigAppService {
    constructor(private readonly configService: ConfigService) {}

    get(key: string): string {
        return this.configService.get<string>(key);
    }

    getNumber(key: string): number {
        return this.configService.get<number>(key);
    }
}
