import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdvModule } from './modules/pdv.module';

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
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
        }),
        PdvModule,
    ],
    providers: [],
})
export class AppModule {}
