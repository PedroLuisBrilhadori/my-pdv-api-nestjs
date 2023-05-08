import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigAppService } from '../config.service';

export const getOrmConfig = async (
    configService: ConfigAppService,
): Promise<TypeOrmModuleOptions> => {
    return {
        name: 'default',
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        port: configService.getNumber('DB_PORT'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        extra: {
            trustServerCertificate: true,
        },
    };
};
