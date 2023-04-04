import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdvModule } from './modules/pdv.module';
import { ormConfig } from './config';

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(ormConfig),
        PdvModule,
    ],
    providers: [],
})
export class AppModule {}
