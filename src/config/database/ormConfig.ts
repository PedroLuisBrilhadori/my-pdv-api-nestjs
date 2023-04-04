import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'mssql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
    extra: {
        trustServerCertificate: true,
    },
};
