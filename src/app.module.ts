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
            host: process.env.BD_HOST,
            username: process.env.BD_USER,
            password: process.env.BD_PASSWORD,
            port: Number(process.env.BD_PORT),
            database: process.env.BD_DATABASE,
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
            extra: {
                trustServerCertificate: true,
            },
        }),
        PdvModule,
    ],
    providers: [],
})
export class AppModule {}
